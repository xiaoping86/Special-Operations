import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useBank } from "@/lib/store";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function HistoryPage() {
  const exams = useBank((s) => s.exams);
  return (
    <Shell title="成绩" subtitle={exams.length ? `${exams.length} 次模拟考试` : "还没有记录"}>
      {exams.length === 0 ? (
        <div className="rounded-[var(--radius-xl)] bg-surface px-6 py-14 text-center text-mac text-muted">
          完成一次模拟考试后，成绩会显示在这里。
        </div>
      ) : (
        <ul className="overflow-hidden rounded-[var(--radius-xl)] bg-surface">
          {exams.map((e, idx) => {
            const score = Math.round((e.correct / e.total) * 100);
            return (
              <li
                key={e.id}
                className={
                  "flex items-center justify-between px-5 py-3.5 " +
                  (idx === exams.length - 1 ? "" : "border-b border-hairline")
                }
              >
                <div>
                  <p className="text-mac-xl font-semibold tabular-nums leading-none">{score}</p>
                  <p className="mt-1 text-mac-sm text-muted">
                    {new Date(e.at).toLocaleString("zh-CN")} · {e.correct}/{e.total}
                  </p>
                </div>
                <p className={e.passed ? "text-mac font-medium text-ok" : "text-mac font-medium text-bad"}>
                  {e.passed ? "及格" : "未及格"}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </Shell>
  );
}
