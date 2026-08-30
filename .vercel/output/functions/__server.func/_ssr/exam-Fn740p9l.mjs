import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as shuffleIds, o as useBank, r as QUESTIONS } from "./router-DfTbBT0r.mjs";
import { t as QuestionView } from "./question-view-BaHULCqp.mjs";
import { t as Shell } from "./shell-BzEcflfB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exam-Fn740p9l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EXAM_SIZE = 100;
var EXAM_SECONDS = 3600;
var PASS = 80;
function ExamPage() {
	const addExam = useBank((s) => s.addExam);
	const [round, setRound] = (0, import_react.useState)(0);
	const seed = (0, import_react.useMemo)(() => (Date.now() + round) % 1e6, [round]);
	const ids = (0, import_react.useMemo)(() => shuffleIds(QUESTIONS.map((q) => q.id), seed).slice(0, Math.min(EXAM_SIZE, QUESTIONS.length)), [seed]);
	const [i, setI] = (0, import_react.useState)(0);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [left, setLeft] = (0, import_react.useState)(EXAM_SECONDS);
	const [done, setDone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setI(0);
		setAnswers({});
		setLeft(EXAM_SECONDS);
		setDone(false);
	}, [round]);
	(0, import_react.useEffect)(() => {
		if (done) return;
		const t = setInterval(() => {
			setLeft((s) => s <= 1 ? 0 : s - 1);
		}, 1e3);
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
		return {
			correct,
			total,
			score: Math.round(correct / total * 100)
		};
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
			passed: score >= PASS
		});
		setDone(true);
	}
	(0, import_react.useEffect)(() => {
		if (left === 0 && !done) finish();
	}, [left]);
	if (done) {
		const { correct, total, score } = scoreNow();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
			title: "考试结果",
			subtitle: score >= PASS ? "达到及格线" : "未及格",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-xl)] bg-surface px-6 py-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-mac-5xl font-semibold leading-none tabular-nums tracking-tight",
						children: score
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-mac text-muted",
						children: [
							"答对 ",
							correct,
							" / ",
							total,
							" · 用时 ",
							fmt(EXAM_SECONDS - left)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/history",
							className: "flex-1 rounded-[var(--radius-md)] bg-surface-2 py-2.5 text-sm font-medium",
							children: "查看历史"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setRound((n) => n + 1),
							className: "flex-1 rounded-[var(--radius-md)] bg-accent py-2.5 text-sm font-medium text-accent-fg",
							children: "再考一次"
						})]
					})
				]
			})
		});
	}
	if (!q) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		title: "模拟考试",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "题库还没准备好。"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "模拟考试",
		subtitle: `第 ${i + 1} / ${ids.length} 题 · 已答 ${answeredCount}`,
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-mac tabular-nums text-muted",
			children: fmt(left)
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionView, {
			q,
			indexLabel: `${i + 1}/${ids.length}`,
			choice: answers[q.id],
			onChoose: (key) => setAnswers((a) => ({
				...a,
				[q.id]: key
			})),
			showResult: false
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mac-toolbar sticky bottom-3 mt-6 flex gap-2 rounded-[var(--radius-lg)] border border-hairline p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: i === 0,
				onClick: () => setI((x) => x - 1),
				className: "h-10 flex-1 rounded-[var(--radius-md)] bg-surface-2 text-sm font-medium disabled:opacity-35",
				children: "上一题"
			}), i < ids.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setI((x) => x + 1),
				className: "h-10 flex-1 rounded-[var(--radius-md)] bg-accent text-sm font-medium text-accent-fg",
				children: "下一题"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: finish,
				className: "h-10 flex-1 rounded-[var(--radius-md)] bg-accent text-sm font-medium text-accent-fg",
				children: "交卷"
			})]
		})]
	});
}
function fmt(sec) {
	const m = Math.floor(sec / 60);
	const s = sec % 60;
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
//#endregion
export { ExamPage as component };
