import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Minus, s as Plus } from "../_libs/lucide-react.mjs";
import { a as shuffleIds, i as TOTAL, n as Route, o as useBank, r as QUESTIONS } from "./router-DfTbBT0r.mjs";
import { t as QuestionView } from "./question-view-BaHULCqp.mjs";
import { t as Shell } from "./shell-BzEcflfB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-DhERpvQD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const ids = (0, import_react.useMemo)(() => {
		if (mode === "wrong") return wrong;
		if (mode === "fav") return favorites;
		if (mode === "rand") return shuffleIds(QUESTIONS.map((q) => q.id));
		return QUESTIONS.map((q) => q.id);
	}, [
		mode,
		wrong,
		favorites
	]);
	const [i, setI] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const start = mode === "seq" ? Math.min(lastSeqIndex, Math.max(0, ids.length - 1)) : 0;
		setI(Number.isFinite(start) ? start : 0);
	}, [mode]);
	const id = ids[i];
	const q = QUESTIONS.find((x) => x.id === id);
	const choice = q ? answered[q.id] : void 0;
	(0, import_react.useEffect)(() => {
		if (mode === "seq") setLastSeqIndex(i);
	}, [
		i,
		mode,
		setLastSeqIndex
	]);
	const title = mode === "wrong" ? "错题本" : mode === "fav" ? "收藏" : mode === "rand" ? "随机练习" : "顺序练习";
	if (!ids.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		title,
		subtitle: "还没有题目",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-xl)] bg-surface px-6 py-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-mac-md font-medium",
					children: "这里还是空的"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-mac text-muted",
					children: "先去做几道顺序练习，错题和收藏会出现在这里。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-4 inline-block text-mac text-accent",
					children: "返回概览"
				})
			]
		})
	});
	if (!q) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		title,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "题目加载中…"
		})
	});
	function choose(key) {
		if (!q || answered[q.id]) return;
		markAnswer(q.id, key, key === q.answer);
	}
	function go(delta) {
		const n = i + delta;
		if (n < 0 || n >= ids.length) return;
		setI(n);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title,
		subtitle: `${i + 1} / ${ids.length}${mode === "seq" ? ` · 全库 ${TOTAL}` : ""}`,
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex overflow-hidden rounded-[var(--radius-sm)] bg-surface-2 p-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "size-7 rounded-[var(--radius-xs)] text-muted hover:bg-surface",
				onClick: () => setFontScale(fontScale - .08),
				"aria-label": "缩小字体",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-3.5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "size-7 rounded-[var(--radius-xs)] text-muted hover:bg-surface",
				onClick: () => setFontScale(fontScale + .08),
				"aria-label": "放大字体",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-3.5" })
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 h-1 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-accent",
					style: { width: `${(i + 1) / ids.length * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionView, {
				q,
				indexLabel: `${i + 1}/${ids.length}`,
				choice,
				locked: Boolean(choice),
				onChoose: choose,
				showResult: Boolean(choice)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mac-toolbar sticky bottom-3 mt-6 flex gap-2 rounded-[var(--radius-lg)] border border-hairline p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: i === 0,
					onClick: () => go(-1),
					className: "h-10 flex-1 rounded-[var(--radius-md)] bg-surface-2 text-sm font-medium disabled:opacity-35",
					children: "上一题"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: i >= ids.length - 1,
					onClick: () => go(1),
					className: "h-10 flex-1 rounded-[var(--radius-md)] bg-accent text-sm font-medium text-accent-fg disabled:opacity-35",
					children: "下一题"
				})]
			})
		]
	});
}
//#endregion
export { PracticePage as component };
