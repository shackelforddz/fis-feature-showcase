"use client";

import { useMemo, useState } from "react";
import { categories } from "@/content/categories";
import { features } from "@/content/features";
import { getWizardQuestions } from "@/content/wizard-questions";
import type { CategoryId, Feedback } from "@/lib/types";
import { BrowsePanel } from "./browse-panel";
import { CategoryBar } from "./category-bar";
import { FeedbackDialog } from "./feedback-dialog";
import { FeedbackPanel } from "./feedback-panel";
import { WizardDialog } from "./wizard-dialog";

type Props = {
  initialFeedback: Record<CategoryId, Feedback[]>;
};

export function Showcase({ initialFeedback }: Props) {
  const [selectedId, setSelectedId] = useState<CategoryId>(categories[0].id);
  const [feedbackByCategory, setFeedbackByCategory] = useState(initialFeedback);
  const [dialogOpen, setDialogOpen] = useState(false);

  const selected = useMemo(
    () => categories.find((c) => c.id === selectedId)!,
    [selectedId]
  );
  const screens = features[selectedId];
  const items = feedbackByCategory[selectedId] ?? [];
  const wizardQuestions = getWizardQuestions(selectedId);

  const appendFeedback = (toAdd: Feedback | Feedback[]) => {
    const arr = Array.isArray(toAdd) ? toAdd : [toAdd];
    setFeedbackByCategory((prev) => ({
      ...prev,
      [selectedId]: [...arr, ...(prev[selectedId] ?? [])].slice(0, 9),
    }));
  };

  return (
    <div className="h-dvh w-dvw flex flex-col gap-12 p-12 bg-background select-none">
      <div className="flex-1 min-h-0 flex gap-12 items-stretch">
        <BrowsePanel screens={screens} categoryId={selectedId} />
        <FeedbackPanel
          category={selected}
          items={items}
          onAddClick={() => setDialogOpen(true)}
        />
      </div>
      <CategoryBar
        categories={categories}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      {wizardQuestions ? (
        <WizardDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          category={selected}
          questions={wizardQuestions}
          onSubmitted={appendFeedback}
        />
      ) : (
        <FeedbackDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          category={selected}
          onSubmitted={appendFeedback}
        />
      )}
    </div>
  );
}
