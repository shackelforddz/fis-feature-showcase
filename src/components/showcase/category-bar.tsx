"use client";

import { ChartPie, FileCheck, FlaskConical, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category, CategoryId } from "@/lib/types";
import { ScribbleHeading } from "./scribble-heading";

type Props = {
  categories: Category[];
  selectedId: CategoryId;
  onSelect: (id: CategoryId) => void;
};

const categoryIcons: Record<CategoryId, typeof ChartPie> = {
  "portfolio-insights": ChartPie,
  "risk-mitigation": ShieldAlert,
  "loan-evaluation": FileCheck,
  "scenario-analysis": FlaskConical,
};

export function CategoryBar({ categories, selectedId, onSelect }: Props) {
  return (
    <section className="shrink-0 rounded-4xl bg-panel/80 backdrop-blur-xl p-12 flex flex-col gap-6">
      <ScribbleHeading rotate={-2.23}>1. Select a category</ScribbleHeading>
      <div className="flex gap-12 items-center">
        {categories.map((category) => {
          const isActive = category.id === selectedId;
          const Icon = categoryIcons[category.id];
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              aria-pressed={isActive}
              className={cn(
                "flex-1 min-w-0 h-full rounded-4xl p-6 flex items-center gap-6 text-left transition-colors outline-none",
                "focus-visible:ring-4 focus-visible:ring-brand/60",
                isActive
                  ? "bg-white text-background"
                  : "bg-panel text-foreground hover:bg-panel/70"
              )}
            >
              <span
                className={cn(
                  "shrink-0 w-[5vw] flex items-center justify-center",
                  isActive ? "text-background" : "text-foreground"
                )}
              >
                <Icon className="w-[2.5vw] h-[2.5vw]" strokeWidth={1.75} />
              </span>
              <span className="flex-1 min-w-0 flex flex-col gap-2">
                <span className="text-[1.25vw] font-heading font-bold leading-[1.25vw]">
                  {category.name}
                </span>
                <span
                  className={cn(
                    "text-[0.94vw] leading-[1.04vw]",
                    isActive ? "text-background/60" : "text-muted-foreground"
                  )}
                >
                  {category.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
