import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  ClipboardList,
  History,
  Shuffle,
  Star,
  RotateCcw,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useBank } from "@/lib/store";
import { TOTAL } from "@/data/questions";

const NAV = [
  { to: "/", label: "概览", icon: Zap, exact: true },
  { to: "/practice", search: { mode: "seq" as const }, label: "顺序练习", icon: BookOpen },
  { to: "/practice", search: { mode: "rand" as const }, label: "随机练习", icon: Shuffle },
  { to: "/exam", label: "模拟考试", icon: ClipboardList },
  { to: "/practice", search: { mode: "wrong" as const }, label: "错题本", icon: RotateCcw },
  { to: "/practice", search: { mode: "fav" as const }, label: "收藏", icon: Star },
  { to: "/history", label: "成绩", icon: History },
] as const;

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const searchStr = useRouterState({ select: (s) => s.location.searchStr });
  const wrong = useBank((s) => s.wrong.length);
  const fav = useBank((s) => s.favorites.length);
  const done = Object.keys(useBank((s) => s.answered)).length;

  function active(item: (typeof NAV)[number]) {
    if ("exact" in item && item.exact) return pathname === "/";
    if (item.to === "/practice") {
      const mode = new URLSearchParams(searchStr.replace(/^\?/, "")).get("mode") || "seq";
      return pathname === "/practice" && "search" in item && item.search.mode === mode;
    }
    return pathname === item.to;
  }

  return (
    <div className="flex min-h-dvh items-stretch justify-center bg-desktop p-0 md:p-5">
      <div className="mac-window flex min-h-dvh w-full max-w-[1180px] flex-col overflow-hidden md:min-h-[calc(100dvh-2.5rem)] md:rounded-[var(--radius-window)]">
        <header className="mac-titlebar flex h-12 shrink-0 items-center gap-3 border-b border-hairline px-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-traffic-red" />
            <span className="size-3 rounded-full bg-traffic-yellow" />
            <span className="size-3 rounded-full bg-traffic-green" />
          </div>
          <p className="flex-1 text-center text-mac font-medium text-muted">低压电工题库</p>
          <p className="hidden text-mac-sm tabular-nums text-subtle sm:block">
            {done}/{TOTAL}
          </p>
        </header>

        <div className="flex min-h-0 flex-1">
          <aside className="mac-sidebar hidden w-[212px] shrink-0 flex-col border-r border-hairline px-3 py-3 md:flex">
            <p className="px-2 pb-2 text-mac-xs font-semibold tracking-wide text-subtle">练习</p>
            <nav className="flex flex-col gap-0.5">
              {NAV.slice(0, 4).map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  active={active(item)}
                  badge={undefined}
                />
              ))}
            </nav>
            <p className="mt-4 px-2 pb-2 text-mac-xs font-semibold tracking-wide text-subtle">资料</p>
            <nav className="flex flex-col gap-0.5">
              <NavItem item={NAV[4]} active={active(NAV[4])} badge={wrong || undefined} />
              <NavItem item={NAV[5]} active={active(NAV[5])} badge={fav || undefined} />
              <NavItem item={NAV[6]} active={active(NAV[6])} badge={undefined} />
            </nav>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col bg-bg">{children}</div>
        </div>

        <nav className="flex border-t border-hairline bg-sidebar md:hidden">
          {NAV.filter((n) => n.label !== "随机练习" && n.label !== "收藏").map((item) => {
            const Icon = item.icon;
            const on = active(item);
            return (
              <Link
                key={item.label}
                to={item.to}
                search={"search" in item ? item.search : undefined}
                className={cn(
                  "flex flex-1 flex-col items-center gap-0.5 py-2 text-mac-xs",
                  on ? "text-accent" : "text-muted",
                )}
              >
                <Icon className="size-5" strokeWidth={on ? 2.2 : 1.8} />
                {item.label.replace("顺序", "").replace("模拟", "")}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function NavItem({
  item,
  active,
  badge,
}: {
  item: (typeof NAV)[number];
  active: boolean;
  badge?: number;
}) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      search={"search" in item ? item.search : undefined}
      className={cn(
        "flex h-8 items-center gap-2 rounded-[var(--radius-sm)] px-2 text-mac transition-colors duration-150",
        active ? "bg-surface text-fg shadow-sm" : "text-fg hover:bg-surface-2",
      )}
    >
      <Icon className="size-4 shrink-0" strokeWidth={1.8} />
      <span className="flex-1 truncate">{item.label}</span>
      {badge ? (
        <span
          className={cn(
            "min-w-5 rounded-full px-1.5 text-center text-mac-xs tabular-nums",
            active ? "bg-surface-2 text-muted" : "bg-surface-2 text-muted",
          )}
        >
          {badge}
        </span>
      ) : null}
    </Link>
  );
}
