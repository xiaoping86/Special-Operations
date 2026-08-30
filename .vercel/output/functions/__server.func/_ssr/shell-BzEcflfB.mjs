import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-BzEcflfB.js
var import_jsx_runtime = require_jsx_runtime();
function Shell({ title, subtitle, right, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3 px-6 pb-3 pt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-mac-2xl font-semibold leading-tight tracking-tight text-fg",
					children: title
				}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-mac text-muted",
					children: subtitle
				}) : null]
			}), right ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-0.5 shrink-0",
				children: right
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-1",
			children
		})]
	});
}
//#endregion
export { Shell as t };
