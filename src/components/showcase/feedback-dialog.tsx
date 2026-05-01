"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { feedbackSchema, type FeedbackInput } from "@/lib/feedback";
import { submitFeedback } from "@/app/actions/feedback";
import type { Category, Feedback } from "@/lib/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category;
  onSubmitted: (feedback: Feedback) => void;
};

const emptyValues = (categoryId: Category["id"]) => ({
  category_id: categoryId,
  quote: "",
  name: "",
  company: "",
});

export function FeedbackDialog({ open, onOpenChange, category, onSubmitted }: Props) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: emptyValues(category.id),
  });

  useEffect(() => {
    form.setValue("category_id", category.id, { shouldValidate: false });
  }, [category.id, form]);

  function onSubmit(values: FeedbackInput) {
    setServerError(null);
    startTransition(async () => {
      const result = await submitFeedback({ ...values, category_id: category.id });
      if (!result.ok) {
        setServerError(result.error);
        return;
      }
      onSubmitted(result.feedback);
      form.reset(emptyValues(category.id));
      onOpenChange(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          form.reset(emptyValues(category.id));
          setServerError(null);
        }
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-[37.5vw] gap-[1.67vw] p-[2.08vw]">
        <DialogHeader className="gap-[0.63vw]">
          <DialogTitle className="text-[2.82vw] font-bold leading-[1.1]">
            Add {category.shortLabel} Feedback
          </DialogTitle>
          <DialogDescription className="text-[1.56vw] leading-[1.3] text-muted-foreground">
            {category.prompt}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[1.25vw]">
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1.56vw]">Your feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Share what stood out to you…"
                      className="text-[1.88vw] min-h-[8.33vw] p-[1.04vw]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-[1.25vw]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1.56vw]">Your name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Jane Doe"
                        className="text-[1.88vw] h-[3.33vw] px-[1.04vw]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1.56vw]">Company</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Acme Bank"
                        className="text-[1.88vw] h-[3.33vw] px-[1.04vw]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {serverError && <p className="text-destructive text-[1.41vw]">{serverError}</p>}

            <DialogFooter className="mt-[0.42vw]">
              <Button
                type="submit"
                disabled={isPending}
                className="h-[3.33vw] px-[2.08vw] text-[1.88vw] rounded-full bg-brand text-brand-foreground hover:bg-brand/90 w-full"
              >
                {isPending ? "Submitting…" : `Submit ${category.shortLabel} Feedback`}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
