import type { Stat } from "#/data/stats.js";

interface StatsGridProps {
  stats: readonly Stat[];
  className?: string;
}

/**
 * Stats の 2 列グリッド（mock portfolio-mock.html `.stats` 相当）。
 * セル間の 1px 線は `gap-px + bg-border` トリック、各セルは `bg-bg`。
 * `∞` 等の特殊文字は自動で letter-spacing を詰める。
 */
export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-px border border-border bg-border ${className ?? ""}`}>
      {stats.map((stat) => {
        const valueClass = stat.value === "∞" ? "tracking-[-0.08em]" : "";
        return (
          <div
            key={stat.label}
            className="bg-bg p-8 transition-colors duration-200 hover:bg-surface"
          >
            <div
              className={`mb-2 font-display text-[46px] font-extrabold leading-none text-text ${valueClass}`}
            >
              {stat.value}
              {stat.sup && <sup className="align-super text-[28px] text-accent">{stat.sup}</sup>}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
