import type { ReactNode } from "react";

export function Shell({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-end justify-between gap-3 px-6 pb-3 pt-6">
        <div className="min-w-0">
          <h1 className="text-mac-2xl font-semibold leading-tight tracking-tight text-fg">{title}</h1>
          {subtitle ? <p className="mt-1 text-mac text-muted">{subtitle}</p> : null}
        </div>
        {right ? <div className="mb-0.5 shrink-0">{right}</div> : null}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-1">{children}</div>
    </div>
  );
}
