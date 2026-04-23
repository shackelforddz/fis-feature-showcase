"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Feedback } from "@/lib/types";

type Props = {
  items: Feedback[];
};

const rotations = [-3.13, 3.8, -2.4, 2.6, -3.6, 3.1, -2.1, 4.2, -3.8];

export function FeedbackWall({ items }: Props) {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      <AnimatePresence initial={false}>
        {items.slice(0, 9).map((item, i) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: rotations[i % rotations.length] }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="aspect-square bg-sticky text-sticky-foreground p-6 shadow-2xl font-handwritten flex flex-col gap-4"
          >
            <p className="text-[24px] leading-tight">&ldquo;{item.quote}&rdquo;</p>
            <p className="text-[16px] mt-auto">
              {item.name}, {item.company}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
