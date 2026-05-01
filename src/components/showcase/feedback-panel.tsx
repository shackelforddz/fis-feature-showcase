"use client";

import type { Category } from "@/lib/types";
import { ScribbleHeading } from "./scribble-heading";

type Props = {
  category: Category;
};

export function FeedbackPanel({ category }: Props) {
  return (
    <section className="flex-1 min-w-0 h-full rounded-4xl bg-panel/80 backdrop-blur-xl p-12 flex flex-col gap-4">
      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <ScribbleHeading rotate={-2.72}>3. Implemented feedback</ScribbleHeading>
        <p className="text-[1.25vw] leading-[1.25vw] font-medium text-muted-foreground">
          {category.prompt}
        </p>
        <div
          data-sticky-notes={category.id}
          className="flex-1 min-h-0 overflow-hidden"
        />
      </div>
    </section>
  );
}
