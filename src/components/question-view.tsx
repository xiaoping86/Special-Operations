import { Bookmark, BookmarkCheck } from "lucide-react";
import type { Question } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useBank } from "@/lib/store";

export function QuestionView({
  q,
  indexLabel,
  choice,
  locked,
  onChoose,
  showResult,
}: {
  q: Question;
  indexLabel: string;
  choice?: string;
  locked?: boolean;
  onChoose: (key: string) => void;
  showResult: boolean;
}) {
  const fontScale = useBank((s) => s.fontScale);
  const favorites = useBank((s) => s.favorites);
  const toggleFav = useBank((s) => s.toggleFav);
  const fav = favorites.includes(q.id);
  const correct = Boolean(choice) && choice === q.answer;

  return (
    <article className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-mac-xs font-medium text-accent">
            {q.type}
          </span>
          <span className="text-mac-sm tabular-nums text-muted">{indexLabel}</span>
        </div>
        <button
          type="button"
          onClick={() => toggleFav(q.id)}
          className="inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-surface-2"
          aria-label={fav ? "取消收藏" : "收藏"}
        >
          {fav ? (
            <BookmarkCheck className="size-4 text-accent" />
          ) : (
            <Bookmark className="size-4" />
          )}
        </button>
      </div>

      <div
        className="stem-html leading-[1.55] text-fg"
        style={{ fontSize: `${1.05 * fontScale}rem` }}
        dangerouslySetInnerHTML={{ __html: `${q.id}. ${q.stem}` }}
      />

      <div className="space-y-2">
        {q.options.map((opt) => {
          const selected = choice === opt.key;
          const isAns = showResult && opt.key === q.answer;
          const isBad = showResult && selected && opt.key !== q.answer;
          const plain = opt.html.replace(/<[^>]+>/g, "").trim();
          const duplicate = !opt.isImage && (!plain || plain === opt.key);

          return (
            <button
              key={opt.key}
              type="button"
              disabled={locked}
              onClick={() => onChoose(opt.key)}
              className={cn(
                "w-full rounded-[var(--radius-lg)] border px-3.5 py-3 text-left transition-colors duration-150",
                isAns && "border-ok bg-ok-bg",
                isBad && "border-bad bg-bad-bg",
                !isAns && !isBad && selected && "border-accent bg-accent-soft",
                !isAns && !isBad && !selected && "border-hairline bg-surface hover:bg-surface-2",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-mac-sm font-semibold",
                    isAns && "bg-ok text-accent-fg",
                    isBad && "bg-bad text-accent-fg",
                    !isAns && !isBad && selected && "bg-accent text-accent-fg",
                    !isAns && !isBad && !selected && "bg-surface-2 text-muted",
                  )}
                >
                  {duplicate
                    ? opt.key === "对"
                      ? "√"
                      : opt.key === "错"
                        ? "×"
                        : opt.key
                    : opt.key}
                </span>
                <div
                  className="opt-html min-w-0 flex-1 leading-snug"
                  style={{ fontSize: `${0.95 * fontScale}rem` }}
                  dangerouslySetInnerHTML={{
                    __html: duplicate ? opt.key : opt.html,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {showResult && choice ? (
        <div
          className={cn(
            "rounded-[var(--radius-lg)] px-4 py-3",
            correct ? "bg-ok-bg" : "bg-bad-bg",
          )}
        >
          <p className={cn("text-sm font-semibold", correct ? "text-ok" : "text-bad")}>
            {correct ? "回答正确" : `回答错误，正确答案：${q.answer}`}
          </p>
          {q.explain ? (
            <p className="mt-1 text-mac leading-relaxed text-fg/80">
              {q.explain.replace(/<[^>]+>/g, "")}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
