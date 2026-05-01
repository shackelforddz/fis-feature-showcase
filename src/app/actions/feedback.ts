"use server";

import { createAdminClient, createClient } from "@/lib/supabase/server";
import {
  feedbackSchema,
  wizardSubmissionSchema,
  type FeedbackInput,
  type WizardSubmissionInput,
} from "@/lib/feedback";
import { getWizardQuestions } from "@/content/wizard-questions";
import type { Feedback, WizardAnswers } from "@/lib/types";

export type SubmitFeedbackResult =
  | { ok: true; feedback: Feedback }
  | { ok: false; error: string };

export type SubmitWizardResult =
  | { ok: true; feedbacks: Feedback[] }
  | { ok: false; error: string };

function hasSupabase() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function submitFeedback(
  input: FeedbackInput
): Promise<SubmitFeedbackResult> {
  const parsed = feedbackSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  if (!hasSupabase() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, error: "Supabase is not configured yet." };
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("feedback")
      .insert(parsed.data)
      .select("id, category_id, quote, name, company, created_at")
      .single();

    if (error || !data) {
      return { ok: false, error: error?.message ?? "Failed to save feedback" };
    }
    return { ok: true, feedback: data as Feedback };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unexpected error",
    };
  }
}

export async function submitWizardSubmission(
  input: WizardSubmissionInput
): Promise<SubmitWizardResult> {
  const parsed = wizardSubmissionSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  if (!hasSupabase() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, error: "Supabase is not configured yet." };
  }

  const questions = getWizardQuestions(parsed.data.category_id);
  if (!questions) {
    return { ok: false, error: "No wizard configured for this category." };
  }
  const boardKeys = questions
    .filter((q) => q.goesToBoard)
    .map((q) => q.id) as (keyof WizardAnswers)[];

  try {
    const supabase = createAdminClient();

    const { data: submission, error: surveyError } = await supabase
      .from("survey_responses")
      .insert({
        category_id: parsed.data.category_id,
        name: parsed.data.name,
        company: parsed.data.company,
        answers: parsed.data.answers,
      })
      .select("id")
      .single();

    if (surveyError || !submission) {
      return {
        ok: false,
        error: surveyError?.message ?? "Failed to save survey response",
      };
    }

    const boardRows = boardKeys.map((key) => ({
      category_id: parsed.data.category_id,
      quote: String(parsed.data.answers[key]),
      name: parsed.data.name,
      company: parsed.data.company,
      question_key: key,
      submission_id: submission.id,
    }));

    const { data, error } = await supabase
      .from("feedback")
      .insert(boardRows)
      .select("id, category_id, quote, name, company, created_at");

    if (error || !data) {
      return { ok: false, error: error?.message ?? "Failed to save feedback" };
    }

    return { ok: true, feedbacks: data as Feedback[] };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unexpected error",
    };
  }
}

export async function listFeedback(
  categoryId?: string,
  limit = 9
): Promise<Feedback[]> {
  if (!hasSupabase()) return [];

  try {
    const supabase = await createClient();
    let query = supabase
      .from("feedback")
      .select("id, category_id, quote, name, company, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query;
    if (error || !data) return [];
    return data as Feedback[];
  } catch {
    return [];
  }
}
