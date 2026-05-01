"use client";

import { useMemo, useState } from "react";
import { categories } from "@/content/categories";
import { features } from "@/content/features";
import type { CategoryId } from "@/lib/types";
import { BrowsePanel } from "./browse-panel";
import { CategoryBar } from "./category-bar";
import { FeedbackPanel } from "./feedback-panel";

export function Showcase() {
  const [selectedId, setSelectedId] = useState<CategoryId>(categories[0].id);

  const selected = useMemo(
    () => categories.find((c) => c.id === selectedId)!,
    [selectedId]
  );
  const screens = features[selectedId];

  return (
    <div className="h-dvh w-dvw flex flex-col gap-12 p-12 bg-background select-none">
      <div className="flex-1 min-h-0 flex gap-12 items-stretch">
        <BrowsePanel screens={screens} categoryId={selectedId} />
        <FeedbackPanel category={selected} />
      </div>
      <CategoryBar
        categories={categories}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </div>
  );
}
