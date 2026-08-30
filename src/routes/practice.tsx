import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { QuestionView } from "@/components/question-view";
import { Shell } from "@/components/shell";
import { QUESTIONS, shuffleIds, TOTAL } from "@/data/questions";
import { useBank } from "@/lib/store";
import type { PracticeMode } from "@/lib/types";

type Search = { mode: PracticeMode };

export const Route = createFileRoute("/practice")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    mode: (["seq", "rand", "wrong", "fav"].includes(String(s.mode))
      ? (s.mode as PracticeMode)
      : "seq"),
  }),
  component: PracticePage,
});

function PracticePage() {
  const { mode } = Route.useSearch();
  const wrong = useBank((s) => s.wrong);
  const favorites = useBank((s) => s.favorites);
  const lastSeqIndex = useBank((s) => s.lastSeqIndex);
  const setLastSeqIndex = useBank((s) => s.setLastSeqIndex);
  const markAnswer = useBank((s) => s.markAnswer);
  const fontScale = useBank((s) => s.fontScale);
  const setFontScale = useBank((s) => s.setFontScale);
  const answered = useBank((s) => s.answered);

  const ids = useMemo(() => {
    if (mode === "wrong") return wrong;
    if (mode === "fav") return favorites;
    if (mode === "rand") return shuffleIds(QUESTIONS.map((q) => q.id));
    return QUESTIONS.map((q) => q.id);
  }, [mode, wrong, favorites]);

  const [i, setI] = useState(0);

  useEffect(() => {
    const start = mode === "seq" ? Math.min(lastSeqIndex, Math.max(0, ids.length - 1)) : 0;
    setI(Number.isFinite(start) ? start : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const id = ids[i];
  const q = QUESTIONS.find((x) => x.id === id);
  const choice = q ? answered[q.id] : undefined;

  useEffect(() => {
    if (mode === "seq") setLastSeqIndex(i);
  }, [i, mode, setLastSeqIndex]);

  const title =
    mode === "wrong"
      ? "错题本"
      : mode === "fav"
        ? "收藏"
        : mode === "rand"
          ? "随机练习"
          : "顺序练习";

  if (!ids.length) {
    return (
      <Shell title={title} subtitle="还没有题目">
        <div className="rounded-[var(--radius-xl)] bg-surface px-6 py-12 text-center">
          <p className="text-mac-md font-medium">这里还是空的</p>
          <p className="mt-1 text-mac text-muted">先去做几道顺序练习，错题和收藏会出现在这里。</p>
          <Link to="/" className="mt-4 inline-block text-mac text-accent">
            返回概览
          </Link>
        </div>
      </Shell>
    );
  }

  if (!q) {
    return (
      <Shell title={title}>
        <p className="text-muted">题目加载中…</p>
      </Shell>
    );
  }

  function choose(key: string) {
    if (!q || answered[q.id]) return;
    markAnswer(q.id, key, key === q.answer);
  }

  function go(delta: number) {
    const n = i + delta;
    if (n < 0 || n >= ids.length) return;
    setI(n);
  }

  return (
    <Shell
      title={title}
      subtitle={`${i + 1} / ${ids.length}${mode === "seq" ? ` · 全库 ${TOTAL}` : ""}`}
      right={
        <div className="flex overflow-hidden rounded-[var(--radius-sm)] bg-surface-2 p-0.5">
          <button
            type="button"
            className="size-7 rounded-[var(--radius-xs)] text-muted hover:bg-surface"
            onClick={() => setFontScale(fontScale - 0.08)}
            aria-label="缩小字体"
          >
            <Minus className="mx-auto size-3.5" />
          </button>
          <button
            type="button"
            className="size-7 rounded-[var(--radius-xs)] text-muted hover:bg-surface"
            onClick={() => setFontScale(fontScale + 0.08)}
            aria-label="放大字体"
          >
            <Plus className="mx-auto size-3.5" />
          </button>
        </div>
      }
    >
      <div className="mb-4 h-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full bg-accent"
          style={{ width: `${((i + 1) / ids.length) * 100}%` }}
        />
      </div>

      <QuestionView
        q={q}
        indexLabel={`${i + 1}/${ids.length}`}
        choice={choice}
        locked={Boolean(choice)}
        onChoose={choose}
        showResult={Boolean(choice)}
      />

      <div className="mac-toolbar sticky bottom-3 mt-6 flex gap-2 rounded-[var(--radius-lg)] border border-hairline p-2">
        <button
          type="button"
          disabled={i === 0}
          onClick={() => go(-1)}
          className="h-10 flex-1 rounded-[var(--radius-md)] bg-surface-2 text-sm font-medium disabled:opacity-35"
        >
          上一题
        </button>
        <button
          type="button"
          disabled={i >= ids.length - 1}
          onClick={() => go(1)}
          className="h-10 flex-1 rounded-[var(--radius-md)] bg-accent text-sm font-medium text-accent-fg disabled:opacity-35"
        >
          下一题
        </button>
      </div>
    </Shell>
  );
}
