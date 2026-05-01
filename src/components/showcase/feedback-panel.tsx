"use client";

import type { Category } from "@/lib/types";
import { stickies, type Sticky } from "@/content/stickies";
import { ScribbleHeading } from "./scribble-heading";

type Props = {
  category: Category;
};

const ROTATIONS = [-3.13, 3.8, -2.4, 2.6, -3.6, 3.1, -2.1, 4.2, -3.8];

export function FeedbackPanel({ category }: Props) {
  const items = stickies[category.id] ?? [];

  return (
    <section className="flex-1 min-w-0 h-full rounded-4xl bg-panel/80 backdrop-blur-xl p-12 flex flex-col gap-4">
      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <ScribbleHeading rotate={-2.72}>3. Implemented feedback</ScribbleHeading>
        <p className="text-[1.25vw] leading-[1.25vw] font-medium text-muted-foreground">
          {category.prompt}
        </p>
        <div
          data-sticky-notes={category.id}
          className="flex-1 min-h-0 grid grid-cols-3 gap-[1.5vw] content-start pt-[0.5vw]"
        >
          {items.slice(0, 6).map((item, i) => (
            <StickyNote
              key={item.id}
              item={item}
              rotation={ROTATIONS[i % ROTATIONS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StickyNote({ item, rotation }: { item: Sticky; rotation: number }) {
  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className="aspect-square bg-sticky text-sticky-foreground p-[1.25vw] shadow-2xl font-handwritten flex flex-col gap-[0.75vw]"
    >
      <p className="text-[0.94vw] leading-tight">&ldquo;{item.quote}&rdquo;</p>
      <p className="text-[0.63vw] mt-auto">
        {item.name}, {item.company}
      </p>
    </div>
  );
}
