import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ChevronRight, r as Trash2 } from "../_libs/lucide-react.mjs";
import { i as TOTAL, o as useBank, r as QUESTIONS } from "./router-DfTbBT0r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DPhFm4kh.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const answered = useBank((s) => s.answered);
	const wrong = useBank((s) => s.wrong);
	const favorites = useBank((s) => s.favorites);
	const lastSeqIndex = useBank((s) => s.lastSeqIndex);
	const exams = useBank((s) => s.exams);
	const clearWrong = useBank((s) => s.clearWrong);
	const done = Object.keys(answered).length;
	const pct = TOTAL ? Math.round(done / TOTAL * 100) : 0;
	const lastExam = exams[0];
	const single = QUESTIONS.filter((q) => q.type === "单选").length;
	const judge = QUESTIONS.filter((q) => q.type === "判断").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-10 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-mac font-medium text-muted",
				children: "电工作业 · 低压精选"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-mac-3xl font-semibold tracking-tight",
				children: "题库"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-mac-sm text-muted",
							children: "完成进度"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-mac-4xl font-semibold leading-none tabular-nums tracking-tight",
							children: [pct, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-0.5 text-mac-lg font-medium text-muted",
								children: "%"
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-mac tabular-nums text-muted",
							children: [
								done,
								" / ",
								TOTAL
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-accent transition-[width] duration-300",
							style: { width: `${pct}%` }
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 divide-x divide-hairline border-t border-hairline",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "单选",
							value: single
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "判断",
							value: judge
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "错题",
							value: wrong.length
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/practice",
				search: { mode: "seq" },
				className: "mt-5 flex items-center justify-between rounded-[var(--radius-lg)] bg-accent px-5 py-3.5 text-accent-fg transition-transform duration-150 active:scale-[0.99]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-mac-md font-semibold",
					children: "继续练习"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-mac-sm text-accent-fg/80",
					children: lastSeqIndex > 0 ? `第 ${lastSeqIndex + 1} 题` : "从第 1 题开始"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5 opacity-80" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 overflow-hidden rounded-[var(--radius-xl)] bg-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						to: "/exam",
						title: "模拟考试",
						detail: "100 题 · 60 分钟"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						to: "/practice",
						search: { mode: "wrong" },
						title: "错题本",
						detail: wrong.length ? `${wrong.length} 道` : "暂无"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						to: "/practice",
						search: { mode: "fav" },
						title: "收藏",
						detail: favorites.length ? `${favorites.length} 道` : "暂无"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						to: "/history",
						title: "历史成绩",
						detail: lastExam ? `${Math.round(lastExam.correct / lastExam.total * 100)} 分` : "暂无记录",
						last: true
					})
				]
			}),
			wrong.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					if (confirm("确定清空全部错题记录？")) clearWrong();
				},
				className: "mt-5 inline-flex items-center justify-center gap-2 self-center px-3 py-2 text-mac text-bad",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "清空错题"]
			}) : null
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-3 py-3 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-lg font-semibold tabular-nums",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-mac-xs text-muted",
			children: label
		})]
	});
}
function Row({ to, search, title, detail, last }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		search,
		className: "flex items-center justify-between px-5 py-3.5 hover:bg-surface-2 " + (last ? "" : "border-b border-hairline"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-mac-md",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1 text-mac text-muted",
			children: [detail, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-subtle" })]
		})]
	});
}
//#endregion
export { Home as component };
