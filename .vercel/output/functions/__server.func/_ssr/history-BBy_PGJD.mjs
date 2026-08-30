import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as useBank } from "./router-DfTbBT0r.mjs";
import { t as Shell } from "./shell-BzEcflfB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-BBy_PGJD.js
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	const exams = useBank((s) => s.exams);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		title: "成绩",
		subtitle: exams.length ? `${exams.length} 次模拟考试` : "还没有记录",
		children: exams.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-[var(--radius-xl)] bg-surface px-6 py-14 text-center text-mac text-muted",
			children: "完成一次模拟考试后，成绩会显示在这里。"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "overflow-hidden rounded-[var(--radius-xl)] bg-surface",
			children: exams.map((e, idx) => {
				const score = Math.round(e.correct / e.total * 100);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between px-5 py-3.5 " + (idx === exams.length - 1 ? "" : "border-b border-hairline"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-mac-xl font-semibold tabular-nums leading-none",
						children: score
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-mac-sm text-muted",
						children: [
							new Date(e.at).toLocaleString("zh-CN"),
							" · ",
							e.correct,
							"/",
							e.total
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: e.passed ? "text-mac font-medium text-ok" : "text-mac font-medium text-bad",
						children: e.passed ? "及格" : "未及格"
					})]
				}, e.id);
			})
		})
	});
}
//#endregion
export { HistoryPage as component };
