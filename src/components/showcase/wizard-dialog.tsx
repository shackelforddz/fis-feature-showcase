"use client";

import { useEffect, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  Category,
  Feedback,
  WizardAnswers,
  WizardQuestion,
} from "@/lib/types";
import { submitWizardSubmission } from "@/app/actions/feedback";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category;
  questions: WizardQuestion[];
  onSubmitted: (feedbacks: Feedback[]) => void;
};

type Answers = Partial<WizardAnswers>;

export function WizardDialog({
  open,
  onOpenChange,
  category,
  questions,
  onSubmitted,
}: Props) {
  const totalQuestions = questions.length;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) {
      setStep(0);
      setDirection(1);
      setAnswers({});
      setName("");
      setCompany("");
      setServerError(null);
    }
  }, [open]);

  const isQuestionStep = step < totalQuestions;
  const isIdentityStep = step === totalQuestions;
  const currentQuestion: WizardQuestion | undefined = questions[step];

  const currentAnswer = currentQuestion
    ? (answers[currentQuestion.id as keyof WizardAnswers] as
        | string
        | number
        | undefined)
    : undefined;

  const isCurrentValid = isQuestionStep
    ? validateAnswer(currentQuestion!, currentAnswer)
    : name.trim().length > 0 && company.trim().length > 0;

  const goNext = () => {
    if (!isCurrentValid) return;
    if (step < totalQuestions) {
      setDirection(1);
      setStep(step + 1);
    } else {
      submit();
    }
  };

  const goBack = () => {
    if (step === 0) return;
    setDirection(-1);
    setStep(step - 1);
  };

  const setAnswer = (id: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submit = () => {
    setServerError(null);
    const full: WizardAnswers = {
      context: (answers.context ?? "").toString().trim(),
      oneWord: (answers.oneWord ?? "").toString().trim(),
      disappointment:
        (answers.disappointment as WizardAnswers["disappointment"]) ??
        "somewhat_disappointed",
      comfort: (answers.comfort ?? "").toString().trim(),
      docsRating: Number(answers.docsRating ?? 0),
      wishlist: (answers.wishlist ?? "").toString().trim(),
    };
    startTransition(async () => {
      const result = await submitWizardSubmission({
        category_id: category.id,
        name: name.trim(),
        company: company.trim(),
        answers: full,
      });
      if (!result.ok) {
        setServerError(result.error);
        return;
      }
      onSubmitted(result.feedbacks);
      onOpenChange(false);
    });
  };

  const progress = (step + 1) / (totalQuestions + 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[920px] gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-10 pt-8 pb-4 gap-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              aria-label="Back"
              className={cn(
                "size-12 rounded-full bg-muted flex items-center justify-center transition-opacity",
                step === 0
                  ? "opacity-30 pointer-events-none"
                  : "hover:bg-muted/80"
              )}
            >
              <ChevronLeft className="size-6" />
            </button>
            <DialogTitle className="text-2xl font-medium">
              Add {category.shortLabel} Feedback
            </DialogTitle>
            <span className="ml-auto text-lg text-muted-foreground tabular-nums">
              {step + 1} / {totalQuestions + 1}
            </span>
          </div>
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-brand"
              initial={false}
              animate={{ width: `${progress * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
            />
          </div>
        </DialogHeader>

        <div className="px-10 pb-10 pt-4 min-h-[420px] flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex-1 flex flex-col gap-6"
            >
              {isQuestionStep && currentQuestion ? (
                <QuestionStep
                  question={currentQuestion}
                  value={currentAnswer}
                  onChange={(v) => setAnswer(currentQuestion.id, v)}
                  onEnter={goNext}
                />
              ) : (
                <IdentityStep
                  name={name}
                  company={company}
                  onNameChange={setName}
                  onCompanyChange={setCompany}
                  onEnter={goNext}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {serverError && (
            <p className="text-destructive text-base mt-4">{serverError}</p>
          )}

          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              onClick={goNext}
              disabled={!isCurrentValid || isPending}
              className="h-14 px-10 text-xl rounded-full bg-brand text-brand-foreground hover:bg-brand/90 disabled:opacity-40 disabled:pointer-events-none"
            >
              {isIdentityStep
                ? isPending
                  ? "Submitting…"
                  : "Submit"
                : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function validateAnswer(
  question: WizardQuestion,
  value: string | number | undefined
): boolean {
  if (value === undefined || value === null) return false;
  if (question.type === "scale") {
    return (
      typeof value === "number" && value >= question.min && value <= question.max
    );
  }
  if (question.type === "choice") {
    return (
      typeof value === "string" &&
      question.options.some((o) => o.value === value)
    );
  }
  if (question.type === "one-word") {
    const str = String(value).trim();
    return str.length > 0 && !/\s/.test(str);
  }
  return typeof value === "string" && value.trim().length > 0;
}

function QuestionStep({
  question,
  value,
  onChange,
  onEnter,
}: {
  question: WizardQuestion;
  value: string | number | undefined;
  onChange: (v: string | number) => void;
  onEnter: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[26px] leading-[1.3] font-medium text-foreground">
        {question.prompt}
      </p>
      {question.type === "textarea" && (
        <Textarea
          autoFocus
          rows={4}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder ?? "Type your answer…"}
          className="text-xl min-h-40 p-5"
        />
      )}
      {question.type === "text" && (
        <Input
          autoFocus
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder ?? "Type your answer…"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter();
            }
          }}
          className="text-xl h-16 px-5"
        />
      )}
      {question.type === "one-word" && (
        <Input
          autoFocus
          value={(value as string) ?? ""}
          onChange={(e) =>
            onChange(e.target.value.replace(/\s+/g, "").slice(0, 40))
          }
          placeholder={question.placeholder ?? "One word"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter();
            }
          }}
          className="text-xl h-16 px-5"
        />
      )}
      {question.type === "choice" && (
        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const selected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                className={cn(
                  "text-left rounded-2xl border-2 px-6 py-5 text-xl transition-colors",
                  selected
                    ? "border-brand bg-brand/10 text-foreground"
                    : "border-border bg-card hover:border-muted-foreground/40"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
      {question.type === "scale" && (
        <ScaleInput
          value={value as number | undefined}
          onChange={onChange}
          min={question.min}
          max={question.max}
          minLabel={question.minLabel}
          maxLabel={question.maxLabel}
        />
      )}
    </div>
  );
}

function ScaleInput({
  value,
  onChange,
  min,
  max,
  minLabel,
  maxLabel,
}: {
  value: number | undefined;
  onChange: (v: number) => void;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
}) {
  const count = max - min + 1;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        {Array.from({ length: count }).map((_, i) => {
          const v = min + i;
          const selected = value === v;
          return (
            <button
              key={v}
              type="button"
              onClick={() => onChange(v)}
              className={cn(
                "flex-1 h-20 rounded-2xl border-2 text-3xl font-medium transition-colors",
                selected
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-card hover:border-muted-foreground/40"
              )}
            >
              {v}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-base text-muted-foreground px-1">
        <span>
          {min} — {minLabel}
        </span>
        <span className="text-right">
          {max} — {maxLabel}
        </span>
      </div>
    </div>
  );
}

function IdentityStep({
  name,
  company,
  onNameChange,
  onCompanyChange,
  onEnter,
}: {
  name: string;
  company: string;
  onNameChange: (v: string) => void;
  onCompanyChange: (v: string) => void;
  onEnter: () => void;
}) {
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter();
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[26px] leading-[1.3] font-medium text-foreground">
        Last step — who are you?
      </p>
      <div className="flex flex-col gap-1.5">
        <label className="text-lg text-muted-foreground">Your name</label>
        <Input
          autoFocus
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Jane Doe"
          className="text-xl h-16 px-5"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-lg text-muted-foreground">Company</label>
        <Input
          value={company}
          onChange={(e) => onCompanyChange(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Acme Bank"
          className="text-xl h-16 px-5"
        />
      </div>
    </div>
  );
}
