import type { Question } from "@/lib/types";
import { optionHtml, rewriteHtml } from "@/lib/html";
import raw from "./questions.json";

type RawQ = {
  id?: number;
  tm: string;
  xxa: string;
  xxb: string;
  xxc: string;
  xxd: string;
  daan: string;
  xuhao: string;
  tizhong: string;
  daanjiexi: string;
};

function toQuestion(id: number, q: RawQ): Question {
  const type = q.tizhong === "判断" ? "判断" : "单选";
  const keys = type === "判断" ? (["对", "错"] as const) : (["A", "B", "C", "D"] as const);
  const src = type === "判断" ? { 对: q.xxa || "对", 错: q.xxb || "错", A: "", B: "", C: "", D: "" } : { A: q.xxa, B: q.xxb, C: q.xxc, D: q.xxd, 对: "", 错: "" };
  const options = keys
    .map((key) => {
      const { html, isImage } = optionHtml(src[key]);
      return { key, html, isImage };
    })
    .filter((o) => o.html.length > 0);

  let answer = (q.daan || "").trim();
  if (type === "判断") {
    if (answer === "A" || answer === "对" || answer === "正确" || answer === "√") answer = "对";
    else if (answer === "B" || answer === "错" || answer === "错误" || answer === "×") answer = "错";
  }

  return {
    id,
    type,
    stem: rewriteHtml(q.tm),
    options,
    answer,
    explain: rewriteHtml(q.daanjiexi || ""),
    serial: String(q.xuhao || id),
  };
}

const dict = raw as Record<string, RawQ>;
export const QUESTIONS: Question[] = Object.keys(dict)
  .map((k) => {
    const q = dict[k];
    const id = Number(q.id ?? k);
    return toQuestion(id, q);
  })
  .sort((a, b) => a.id - b.id);

export const TOTAL = QUESTIONS.length;
export const BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));

export function getQuestion(id: number) {
  return BY_ID.get(id);
}

export function shuffleIds(ids: number[], seed?: number) {
  const arr = [...ids];
  let s = seed ?? Date.now() % 1_000_000;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
