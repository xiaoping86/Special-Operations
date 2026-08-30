import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Trash2 } from "lucide-react";
import { QUESTIONS, TOTAL } from "@/data/questions";
import { useBank } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const answered = useBank((s) => s.answered);
  const wrong = useBank((s) => s.wrong);
  const favorites = useBank((s) => s.favorites);
  const lastSeqIndex = useBank((s) => s.lastSeqIndex);
  const exams = useBank((s) => s.exams);
  const clearWrong = useBank((s) => s.clearWrong);

  const done = Object.keys(answered).length;
  const pct = TOTAL ? Math.round((done / TOTAL) * 100) : 0;
  const lastExam = exams[0];
  const single = QUESTIONS.filter((q) => q.type === "单选").length;
  const judge = QUESTIONS.filter((q) => q.type === "判断").length;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-10 pt-6">
      <p className="text-mac font-medium text-muted">电工作业 · 低压精选</p>
      <h1 className="mt-1 text-mac-3xl font-semibold tracking-tight">题库</h1>

      <section className="mt-6 overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface">
        <div className="px-5 py-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-mac-sm text-muted">完成进度</p>
              <p className="mt-1 text-mac-4xl font-semibold leading-none tabular-nums tracking-tight">
                {pct}
                <span className="ml-0.5 text-mac-lg font-medium text-muted">%</span>
              </p>
            </div>
            <p className="text-mac tabular-nums text-muted">
              {done} / {TOTAL}
            </p>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-hairline border-t border-hairline">
          <Stat label="单选" value={single} />
          <Stat label="判断" value={judge} />
          <Stat label="错题" value={wrong.length} />
        </div>
      </section>

      <Link
        to="/practice"
        search={{ mode: "seq" }}
        className="mt-5 flex items-center justify-between rounded-[var(--radius-lg)] bg-accent px-5 py-3.5 text-accent-fg transition-transform duration-150 active:scale-[0.99]"
      >
        <span>
          <span className="block text-mac-md font-semibold">继续练习</span>
          <span className="block text-mac-sm text-accent-fg/80">
            {lastSeqIndex > 0 ? `第 ${lastSeqIndex + 1} 题` : "从第 1 题开始"}
          </span>
        </span>
        <ChevronRight className="size-5 opacity-80" />
      </Link>

      <section className="mt-6 overflow-hidden rounded-[var(--radius-xl)] bg-surface">
        <Row to="/exam" title="模拟考试" detail="100 题 · 60 分钟" />
        <Row
          to="/practice"
          search={{ mode: "wrong" }}
          title="错题本"
          detail={wrong.length ? `${wrong.length} 道` : "暂无"}
        />
        <Row
          to="/practice"
          search={{ mode: "fav" }}
          title="收藏"
          detail={favorites.length ? `${favorites.length} 道` : "暂无"}
        />
        <Row
          to="/history"
          title="历史成绩"
          detail={
            lastExam
              ? `${Math.round((lastExam.correct / lastExam.total) * 100)} 分`
              : "暂无记录"
          }
          last
        />
      </section>

      {wrong.length > 0 ? (
        <button
          type="button"
          onClick={() => {
            if (confirm("确定清空全部错题记录？")) clearWrong();
          }}
          className="mt-5 inline-flex items-center justify-center gap-2 self-center px-3 py-2 text-mac text-bad"
        >
          <Trash2 className="size-3.5" />
          清空错题
        </button>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-3 py-3 text-center">
      <p className="text-lg font-semibold tabular-nums">{value}</p>
      <p className="mt-0.5 text-mac-xs text-muted">{label}</p>
    </div>
  );
}

function Row({
  to,
  search,
  title,
  detail,
  last,
}: {
  to: "/exam" | "/practice" | "/history";
  search?: { mode: "wrong" | "fav" };
  title: string;
  detail: string;
  last?: boolean;
}) {
  return (
    <Link
      to={to}
      search={search}
      className={
        "flex items-center justify-between px-5 py-3.5 hover:bg-surface-2 " +
        (last ? "" : "border-b border-hairline")
      }
    >
      <span className="text-mac-md">{title}</span>
      <span className="flex items-center gap-1 text-mac text-muted">
        {detail}
        <ChevronRight className="size-4 text-subtle" />
      </span>
    </Link>
  );
}
