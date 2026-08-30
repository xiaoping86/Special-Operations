const IMG_EXT = /\.(png|jpe?g|gif|bmp)$/i;

export function rewriteHtml(raw: string | null | undefined): string {
  if (!raw) return "";
  let s = String(raw);
  s = s.replace(/\{ftp_www\}\/photo\/tq\//gi, "/tq/");
  s = s.replace(/(?:src=['"])(?:\.\.\/)*tq\//gi, 'src="/tq/');
  s = s.replace(/src=['"](?!\/|https?:)([^'"]+)['"]/gi, 'src="/tq/$1"');
  s = s.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  s = s.replace(/on\w+=['"][^'"]*['"]/gi, "");
  return s;
}

export function isImageName(v: string | null | undefined): boolean {
  if (!v) return false;
  const t = v.trim();
  if (!t || t === "0") return false;
  return IMG_EXT.test(t) && !t.includes("<") && t.length < 180;
}

export function optionHtml(v: string | null | undefined): { html: string; isImage: boolean } {
  const t = (v || "").trim();
  if (!t || t === "0") return { html: "", isImage: false };
  if (isImageName(t)) {
    const name = t.replace(/^.*\//, "");
    return {
      html: `<img src="/tq/${encodeURI(name)}" alt="选项图" />`,
      isImage: true,
    };
  }
  return { html: rewriteHtml(t), isImage: false };
}
