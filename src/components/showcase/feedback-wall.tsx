"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Pin } from "lucide-react";
import type { Feedback } from "@/lib/types";

type Props = {
  items: Feedback[];
};

const rotations = [-3.13, 3.8, -2.4, 2.6, -3.6, 3.1, -2.1, 4.2, -3.8];
const LONG_PRESS_MS = 500;
const DISPLAY_LIMIT = 9;
const PIN_STORAGE_KEY = "feedback-wall-pinned";

const IMPLEMENTED_QUOTES = [
  "know what info to provide it to give me an actual memo start a document that an analyst can finish",
  "see i import some data",
  "like to see the system pushing the information into documentation software and then doc software push closed loan into the core",
  "hyperlinks for traceability to supportind documents",
  "risk rating here as well- recommended is a must have",
  "every deal is different based on the deal structure and financial of borrower",
  "Show the minimum amount of data they needed to provide to get a credit memo",
  "Where is this data comming from?",
  "I want to see the import data process here. How does the data make its way into the tool? How much work is it? Does it flow through directly?",
  "Be able to search and see how any clients is doing based on their financials not just the ones pushed to the top here",
  "Search and see how any client is doing based on their covenant monitoring",
];

const normalizeQuote = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const IMPLEMENTED_SET = new Set(IMPLEMENTED_QUOTES.map(normalizeQuote));
const isImplemented = (quote: string) =>
  IMPLEMENTED_SET.has(normalizeQuote(quote));

export function FeedbackWall({ items }: Props) {
  const [pinned, setPinned] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PIN_STORAGE_KEY);
      if (raw) setPinned(new Set(JSON.parse(raw) as string[]));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        PIN_STORAGE_KEY,
        JSON.stringify(Array.from(pinned))
      );
    } catch {}
  }, [hydrated, pinned]);

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
            isImplemented={isImplemented(item.quote)}
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
  isImplemented,
  onTogglePin,
}: {
  item: Feedback;
  rotation: number;
  isPinned: boolean;
  isImplemented: boolean;
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
      style={{ WebkitTouchCallout: "none", containerType: "inline-size" }}
      className="relative aspect-square bg-sticky text-sticky-foreground shadow-2xl font-handwritten cursor-pointer"
    >
      <AnimatePresence>
        {isPinned && (
          <motion.div
            key="pin"
            initial={{ scale: 0, rotate: -30, opacity: 0 }}
            animate={{ scale: 1, rotate: 25, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 16 }}
            className="absolute -top-[3cqi] -right-[3cqi] bg-primary text-primary-foreground rounded-full p-[3cqi] shadow-lg pointer-events-none"
          >
            <Pin className="w-[6cqi] h-[6cqi]" strokeWidth={2.5} />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`h-full w-full flex flex-col p-[7cqi] gap-[4cqi] transition-opacity ${
          isImplemented ? "opacity-50" : ""
        }`}
      >
        <p className="text-[9.5cqi] leading-[1.15]">&ldquo;{item.quote}&rdquo;</p>
        <p className="text-[6cqi] mt-auto">
          {item.name}, {item.company}
        </p>
      </div>
      <AnimatePresence>
        {isImplemented && (
          <motion.div
            key="implemented"
            initial={{ scale: 0.6, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: -12 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <svg
              viewBox="0 0 100 22"
              preserveAspectRatio="xMidYMid meet"
              className="w-[80cqi] text-sticky-foreground"
            >
              <rect
                x="1"
                y="1"
                width="98"
                height="20"
                rx="2.5"
                ry="2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <text
                x="50"
                y="14.5"
                textAnchor="middle"
                fontFamily="var(--font-source-sans), ui-sans-serif, sans-serif"
                fontWeight="700"
                fontSize="11"
                letterSpacing="1.5"
                fill="currentColor"
              >
                IMPLEMENTED
              </text>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
