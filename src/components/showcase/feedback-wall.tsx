"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Pin } from "lucide-react";
import type { Feedback } from "@/lib/types";

type Props = {
  items: Feedback[];
};

const rotations = [-3.13, 3.8, -2.4, 2.6, -3.6, 3.1, -2.1, 4.2, -3.8];
const LONG_PRESS_MS = 500;
const DISPLAY_LIMIT = 9;

export function FeedbackWall({ items }: Props) {
  const [pinned, setPinned] = useState<Set<string>>(new Set());

  const togglePin = (id: string) => {
    setPinned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const ordered = [
    ...items.filter((i) => pinned.has(i.id)),
    ...items.filter((i) => !pinned.has(i.id)),
  ];

  return (
    <div className="relative grid grid-cols-3 gap-6 p-6">
      <AnimatePresence initial={false} mode="popLayout">
        {ordered.slice(0, DISPLAY_LIMIT).map((item, i) => (
          <Sticky
            key={item.id}
            item={item}
            rotation={rotations[i % rotations.length]}
            isPinned={pinned.has(item.id)}
            onTogglePin={() => togglePin(item.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Sticky({
  item,
  rotation,
  isPinned,
  onTogglePin,
}: {
  item: Feedback;
  rotation: number;
  isPinned: boolean;
  onTogglePin: () => void;
}) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    timer.current = setTimeout(() => {
      onTogglePin();
      timer.current = null;
    }, LONG_PRESS_MS);
  };
  const cancel = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      style={{ WebkitTouchCallout: "none" }}
      className="relative aspect-square bg-sticky text-sticky-foreground p-6 shadow-2xl font-handwritten flex flex-col gap-4 cursor-pointer"
    >
      <AnimatePresence>
        {isPinned && (
          <motion.div
            key="pin"
            initial={{ scale: 0, rotate: -30, opacity: 0 }}
            animate={{ scale: 1, rotate: 25, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 16 }}
            className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full p-2 shadow-lg pointer-events-none"
          >
            <Pin className="w-[1vw] h-[1vw]" strokeWidth={2.5} />
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-[0.94vw] leading-tight">&ldquo;{item.quote}&rdquo;</p>
      <p className="text-[0.63vw] mt-auto">
        {item.name}, {item.company}
      </p>
    </motion.div>
  );
}
