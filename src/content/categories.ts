import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "portfolio-insights",
    number: 1,
    name: "Portfolio Insights",
    shortLabel: "Portfolio",
    description:
      "Uses modeling to find leads for upsell and cross-sell. Users can generate documents for review.",
    prompt:
      "Is there anything that you would add or take away from portfolio insights?",
  },
  {
    id: "risk-mitigation",
    number: 2,
    name: "Risk Mitigation",
    shortLabel: "Risk",
    description:
      "Provides warnings based on the borrower's health and signals; includes strategies to mitigate, restructure, or monetize and options to generate review documents.",
    prompt:
      "Is there anything that you would add or take away from risk mitigation?",
  },
  {
    id: "loan-evaluation",
    number: 3,
    name: "Loan Evaluation Center",
    shortLabel: "Loan",
    description:
      "Provide pre-approval for each loan, linked to evidence, with option to auto-generate documents like term sheets and credit memos using real-time data.",
    prompt:
      "Is there anything that you would add or take away from the loan evaluation center?",
  },
  {
    id: "scenario-analysis",
    number: 4,
    name: "Scenario Analysis",
    shortLabel: "Scenario",
    description:
      "Automates insight extraction from unstructured data, enabling real-time stress-testing of variables and assessing deal structure impact. Results are traceable.",
    prompt:
      "Is there anything that you would add or take away from scenario analysis?",
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
