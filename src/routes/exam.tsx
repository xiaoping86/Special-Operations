import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { QuestionView } from "@/components/question-view";
import { Shell } from "@/components/shell";
import { QUESTIONS, shuffleIds } from "@/data/questions";
import { useBank } from "@/lib/store";

const EXAM_SIZE = 100;
const EXAM_SECONDS = 60 * 60;
const PASS = 80;

export const Route = createFileRoute("/exam")({ component: ExamPage });

function ExamPage() {
  const addExam = useBank((s) => s.addExam);
  const [round, setRound] = useState(0);
  const seed = useMemo(() => (Date.now() + round) % 1_000_000, [round]);
  const ids = useMemo(
    () =>
      shuffleIds(
        QUESTIONS.map((q) => q.id),
        seed,
      ).slice(0, Math.min(EXAM_SIZE, QUESTIONS.length)),
    [seed],
  );
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [left, setLeft] = useState(EXAM_SECONDS);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setI(0);
    setAnswers({});
    setLeft(EXAM_SECONDS);
    setDone(false);
  }, [round]);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => {
      setLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [done, round]);

  const q = QUESTIONS.find((x) => x.id === ids[i]);
  const answeredCount = Object.keys(answers).length;

  function scoreNow() {
    let correct = 0;
    for (const id of ids) {
      const qq = QUESTIONS.find((x) => x.id === id);
      if (qq && answers[id] === qq.answer) correct += 1;
    }
    const total = ids.length || 1;
    return { correct, total, score: Math.round((correct / total) * 100) };
  }

  function finish() {
    if (done) return;
    const { correct, total, score } = scoreNow();
    addExam({
      id: String(Date.now()),
      at: Date.now(),
      total,
      correct,
      seconds: EXAM_SECONDS - left,
      passed: score >= PASS,
    });
    setDone(true);
  }

  useEffect(() => {
    if (left === 0 && !done) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  if (done) {
    const { correct, total, score } = scoreNow();
    const passed = score >= PASS;
    return (
      <Shell title="考试结果" subtitle={passed ? "达到及格线" : "未及格"}>
        <div className="rounded-[var(--radius-xl)] bg-surface px-6 py-10 text-center">
          <p className="text-mac-5xl font-semibold leading-none tabular-nums tracking-tight">{score}</p>
          <p className="mt-3 text-mac text-muted">
            答对 {correct} / {total} · 用时 {fmt(EXAM_SECONDS - left)}
          </p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <Link
              to="/history"
              className="flex-1 rounded-[var(--radius-md)] bg-surface-2 py-2.5 text-sm font-medium"
            >
              查看历史
            </Link>
            <button
              type="button"
              onClick={() => setRound((n) => n + 1)}
              className="flex-1 rounded-[var(--radius-md)] bg-accent py-2.5 text-sm font-medium text-accent-fg"
            >
              再考一次
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  if (!q) {
    return (
      <Shell title="模拟考试">
        <p className="text-muted">题库还没准备好。</p>
      </Shell>
    );
  }

  return (
    <Shell
      title="模拟考试"
      subtitle={`第 ${i + 1} / ${ids.length} 题 · 已答 ${answeredCount}`}
      right={<span className="text-mac tabular-nums text-muted">{fmt(left)}</span>}
    >
      <QuestionView
        q={q}
        indexLabel={`${i + 1}/${ids.length}`}
        choice={answers[q.id]}
        onChoose={(key) => setAnswers((a) => ({ ...a, [q.id]: key }))}
        showResult={false}
      />
      <div className="mac-toolbar sticky bottom-3 mt-6 flex gap-2 rounded-[var(--radius-lg)] border border-hairline p-2">
        <button
          type="button"
          disabled={i === 0}
          onClick={() => setI((x) => x - 1)}
          className="h-10 flex-1 rounded-[var(--radius-md)] bg-surface-2 text-sm font-medium disabled:opacity-35"
        >
          上一题
        </button>
        {i < ids.length - 1 ? (
          <button
            type="button"
            onClick={() => setI((x) => x + 1)}
            className="h-10 flex-1 rounded-[var(--radius-md)] bg-accent text-sm font-medium text-accent-fg"
          >
            下一题
          </button>
        ) : (
          <button
            type="button"
            onClick={finish}
            className="h-10 flex-1 rounded-[var(--radius-md)] bg-accent text-sm font-medium text-accent-fg"
          >
            交卷
          </button>
        )}
      </div>
    </Shell>
  );
}

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
