"use client";

import { cn } from "@/lib/utils";
import type { Category, CategoryId } from "@/lib/types";
import { ScribbleHeading } from "./scribble-heading";

type Props = {
  categories: Category[];
  selectedId: CategoryId;
  onSelect: (id: CategoryId) => void;
};

export function CategoryBar({ categories, selectedId, onSelect }: Props) {
  return (
    <section className="shrink-0 rounded-4xl bg-panel/80 backdrop-blur-xl p-12 flex flex-col gap-6">
      <ScribbleHeading rotate={-2.23}>1. Select a category</ScribbleHeading>
      <div className="flex gap-12 h-[304px] items-center">
        {categories.map((category) => {
          const isActive = category.id === selectedId;
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
                  "shrink-0 size-[160px] flex items-center justify-center text-[96px] font-medium leading-none",
                  isActive ? "text-background" : "text-foreground"
                )}
              >
                {category.number}
              </span>
              <span className="flex-1 min-w-0 flex flex-col gap-2">
                <span className="text-[48px] font-medium leading-[48px]">
                  {category.name}
                </span>
                <span
                  className={cn(
                    "text-[36px] leading-[40px]",
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
