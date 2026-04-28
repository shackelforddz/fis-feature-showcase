"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Feedback } from "@/lib/types";

type Props = {
  items: Feedback[];
};

const rotations = [-3.13, 3.8, -2.4, 2.6, -3.6, 3.1, -2.1, 4.2, -3.8];

const SIMULATE_COUNT = 15;
const DISPLAY_LIMIT = 9;
const SIMULATED_QUOTES: Array<Pick<Feedback, "quote" | "name" | "company">> = [
  { quote: "I'd want to see the DSCR trend before I dial.", name: "Marcus Lee", company: "Pinebrook Bank" },
  { quote: "Surface UCC filings inline with the risk score.", name: "Priya N.", company: "Cascade Credit" },
  { quote: "Pre-approval shortcuts would save me hours.", name: "Dana Wu", company: "Harborline" },
  { quote: "Show me confidence intervals on the recs.", name: "Tom B.", company: "Riverstone" },
  { quote: "Cross-sell prompts are spot on for my book.", name: "Aisha K.", company: "Northvale" },
  { quote: "Need a way to mute alerts during reviews.", name: "Liam P.", company: "Ironforge Capital" },
  { quote: "Memo drafts are 80% of the way there.", name: "Sara D.", company: "Crestmont Bank" },
  { quote: "Add a comparable-deals module please.", name: "Gabriel M.", company: "Avena Lending" },
  { quote: "Borrower health summary is gold.", name: "Hannah O.", company: "Beacon Trust" },
  { quote: "Wish the evidence layer linked to source docs.", name: "Wei C.", company: "Summit Federal" },
  { quote: "Stress-test scenarios feel realistic enough.", name: "Noah V.", company: "Glacier Capital" },
  { quote: "Filter by industry would be a quick win.", name: "Elena R.", company: "Ardentia Bank" },
  { quote: "I'd trust this if I could see the inputs.", name: "Owen J.", company: "Fairhaven" },
  { quote: "Auto-draft is a huge time saver on memos.", name: "Mia T.", company: "Coral Ridge" },
  { quote: "Wish I could pin a borrower to the top.", name: "Rajiv S.", company: "Halcyon Bank" },
];

function buildSimulated(real: Feedback[]): Feedback[] {
  if (real.length >= SIMULATE_COUNT) return real.slice(0, SIMULATE_COUNT);
  const filler: Feedback[] = SIMULATED_QUOTES.slice(
    0,
    SIMULATE_COUNT - real.length
  ).map((q, i) => ({
    id: `sim-${i}`,
    category_id: real[0]?.category_id ?? "portfolio-insights",
    created_at: new Date().toISOString(),
    ...q,
  }));
  return [...real, ...filler];
}

export function FeedbackWall({ items }: Props) {
  const display = buildSimulated(items);
  return (
    <div className="relative grid grid-cols-3 gap-6 p-6">
      <AnimatePresence initial={false} mode="popLayout">
        {display.slice(0, DISPLAY_LIMIT).map((item, i) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: rotations[i % rotations.length] }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="aspect-square bg-sticky text-sticky-foreground p-6 shadow-2xl font-handwritten flex flex-col gap-4"
          >
            <p className="text-[0.94vw] leading-tight">&ldquo;{item.quote}&rdquo;</p>
            <p className="text-[0.63vw] mt-auto">
              {item.name}, {item.company}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
