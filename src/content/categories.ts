import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "portfolio-insights",
    name: "Portfolio Insights",
    shortLabel: "Portfolio",
    description:
      "Identity leads to upsell/cross-sell through lookalike modeling with generated documents for review",
    prompt:
      "Is there anything that you would add or take away from portfolio insights?",
  },
  {
    id: "risk-mitigation",
    name: "Risk Mitigation",
    shortLabel: "Risk",
    description:
      "Surface warnings based on a borrowers health and external signals; with strategies to mitigate, restructure or monetize",
    prompt:
      "Is there anything that you would add or take away from risk mitigation?",
  },
  {
    id: "loan-evaluation",
    name: "Loan Evaluation Center",
    shortLabel: "Loan",
    description:
      "Provide pre-approvals for loans with supporting evidence with generated documents for review",
    prompt:
      "Is there anything that you would add or take away from the loan evaluation center?",
  },
  {
    id: "scenario-analysis",
    name: "Visual Scenario Analysis",
    shortLabel: "Scenario",
    description:
      "Automate insight extraction, enabling real-time stress testing of variables for the deal structure",
    prompt:
      "Is there anything that you would add or take away from scenario analysis?",
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
