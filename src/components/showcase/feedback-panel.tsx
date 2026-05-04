"use client";

import { Button } from "@/components/ui/button";
import type { Category, Feedback } from "@/lib/types";
import { FeedbackWall } from "./feedback-wall";
import { ScribbleHeading } from "./scribble-heading";

type Props = {
  category: Category;
  items: Feedback[];
  onAddClick: () => void;
};

export function FeedbackPanel({ category, items, onAddClick }: Props) {
  return (
    <section className="flex-1 min-w-0 h-full rounded-4xl bg-panel/80 backdrop-blur-xl p-12 flex flex-col gap-4">
      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <ScribbleHeading rotate={-2.72}>3. Leave feedback</ScribbleHeading>
        <p className="text-[1.25vw] leading-[1.25vw] font-medium text-muted-foreground">
          {category.prompt}
        </p>
        <div className="flex-1 min-h-0 overflow-hidden">
          <FeedbackWall items={items} />
        </div>
      </div>
      <Button
        type="button"
        onClick={onAddClick}
        className="h-[108px] w-full rounded-full bg-brand text-brand-foreground text-[1.1vw] font-bold hover:bg-brand/90"
      >
        Add {category.shortLabel} Feedback
      </Button>
    </section>
  );
}
