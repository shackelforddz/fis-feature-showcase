import type { CategoryId, WizardQuestion } from "@/lib/types";
import { loanEvaluationQuestions } from "./loan-evaluation-questions";
import { portfolioQuestions } from "./portfolio-questions";
import { riskQuestions } from "./risk-questions";
import { scenarioAnalysisQuestions } from "./scenario-analysis-questions";

export const wizardQuestionsByCategory: Partial<
  Record<CategoryId, WizardQuestion[]>
> = {
  "portfolio-insights": portfolioQuestions,
  "risk-mitigation": riskQuestions,
  "loan-evaluation": loanEvaluationQuestions,
  "scenario-analysis": scenarioAnalysisQuestions,
};

export function getWizardQuestions(
  categoryId: CategoryId
): WizardQuestion[] | undefined {
  return wizardQuestionsByCategory[categoryId];
}
