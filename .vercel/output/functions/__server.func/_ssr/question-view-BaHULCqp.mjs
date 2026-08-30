import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Bookmark, p as BookmarkCheck } from "../_libs/lucide-react.mjs";
import { o as useBank, s as cn } from "./router-DfTbBT0r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/question-view-BaHULCqp.js
var import_jsx_runtime = require_jsx_runtime();
function QuestionView({ q, indexLabel, choice, locked, onChoose, showResult }) {
	const fontScale = useBank((s) => s.fontScale);
	const favorites = useBank((s) => s.favorites);
	const toggleFav = useBank((s) => s.toggleFav);
	const fav = favorites.includes(q.id);
	const correct = Boolean(choice) && choice === q.answer;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-accent-soft px-2 py-0.5 text-mac-xs font-medium text-accent",
						children: q.type
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-mac-sm tabular-nums text-muted",
						children: indexLabel
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => toggleFav(q.id),
					className: "inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-surface-2",
					"aria-label": fav ? "取消收藏" : "收藏",
					children: fav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stem-html leading-[1.55] text-fg",
				style: { fontSize: `${1.05 * fontScale}rem` },
				dangerouslySetInnerHTML: { __html: `${q.id}. ${q.stem}` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: q.options.map((opt) => {
					const selected = choice === opt.key;
					const isAns = showResult && opt.key === q.answer;
					const isBad = showResult && selected && opt.key !== q.answer;
					const plain = opt.html.replace(/<[^>]+>/g, "").trim();
					const duplicate = !opt.isImage && (!plain || plain === opt.key);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: locked,
						onClick: () => onChoose(opt.key),
						className: cn("w-full rounded-[var(--radius-lg)] border px-3.5 py-3 text-left transition-colors duration-150", isAns && "border-ok bg-ok-bg", isBad && "border-bad bg-bad-bg", !isAns && !isBad && selected && "border-accent bg-accent-soft", !isAns && !isBad && !selected && "border-hairline bg-surface hover:bg-surface-2"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-mac-sm font-semibold", isAns && "bg-ok text-accent-fg", isBad && "bg-bad text-accent-fg", !isAns && !isBad && selected && "bg-accent text-accent-fg", !isAns && !isBad && !selected && "bg-surface-2 text-muted"),
								children: duplicate ? opt.key === "对" ? "√" : opt.key === "错" ? "×" : opt.key : opt.key
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "opt-html min-w-0 flex-1 leading-snug",
								style: { fontSize: `${.95 * fontScale}rem` },
								dangerouslySetInnerHTML: { __html: duplicate ? opt.key : opt.html }
							})]
						})
					}, opt.key);
				})
			}),
			showResult && choice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("rounded-[var(--radius-lg)] px-4 py-3", correct ? "bg-ok-bg" : "bg-bad-bg"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-sm font-semibold", correct ? "text-ok" : "text-bad"),
					children: correct ? "回答正确" : `回答错误，正确答案：${q.answer}`
				}), q.explain ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-mac leading-relaxed text-fg/80",
					children: q.explain.replace(/<[^>]+>/g, "")
				}) : null]
			}) : null
		]
	});
}
//#endregion
export { QuestionView as t };
