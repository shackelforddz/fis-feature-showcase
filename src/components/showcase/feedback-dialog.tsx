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
      <DialogContent className="sm:max-w-[720px] gap-8 p-10">
        <DialogHeader className="gap-3">
          <DialogTitle className="text-4xl font-medium">
            Add {category.shortLabel} Feedback
          </DialogTitle>
          <DialogDescription className="text-xl text-muted-foreground">
            {category.prompt}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Your feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Share what stood out to you…"
                      className="text-2xl min-h-40 p-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Your name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Jane Doe"
                        className="text-2xl h-16 px-5"
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
                    <FormLabel className="text-xl">Company</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Acme Bank"
                        className="text-2xl h-16 px-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {serverError && <p className="text-destructive text-lg">{serverError}</p>}

            <DialogFooter className="mt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="h-16 px-10 text-2xl rounded-full bg-brand text-brand-foreground hover:bg-brand/90 w-full"
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
