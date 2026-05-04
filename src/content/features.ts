import type { CategoryId, FeatureScreen } from "@/lib/types";

export const features: Record<CategoryId, FeatureScreen[]> = {
  "portfolio-insights": [
    {
      id: "pi-1",
      image: "/features/portfolio-1.jpg",
      annotation: {
        title: "Growth Opportunities",
        body: "Identify high-propensity leads with next actions like Expansion, Retention, or Wallet Share.",
        side: "left",
        y: 60,
      },
    },
    {
      id: "pi-2",
      image: "/features/portfolio-2.mp4",
      annotation: {
        title: "Lender's Co-pilot",
        body: "A unified intelligence layer that identifies high-growth clients missing key products.",
        side: "right",
        y: 40,
      },
    },
    {
      id: "pi-3",
      image: "/features/portfolio-3.mp4",
      annotation: {
        title: "Evidence Layer",
        body: "Data behind growth opportunities with internal and third-party data. Real-time DSCR via API.",
        side: "left",
        y: 55,
      },
    },
    {
      id: "pi-4",
      image: "/features/portfolio-4.mp4",
      annotation: {
        title: "AI Generated Documents",
        body: "Next steps for automated document creation based on real-time information.",
        side: "right",
        y: 50,
      },
    },
  ],
  "risk-mitigation": [
    {
      id: "rm-1",
      image: "/features/risk-1.jpg",
      annotation: {
        title: "Servicing Suggestions",
        body: "The risk score synthesizes a borrower's health and signs. When flagged, it matches concerns to suggestions for mitigation, restructuring, or secondary market moves.",
        side: "left",
        y: 60,
      },
    },
    {
      id: "rm-2",
      image: "/features/risk-2.mp4",
      annotation: {
        title: "Lender's Co-pilot",
        body: "Lenders can cross-reference intent vs reality using semantic search, identifying behavioral drift and compliance guardrails.",
        side: "right",
        y: 50,
      },
    },
    {
      id: "rm-3",
      image: "/features/risk-3.mp4",
      annotation: {
        title: "Evidence Layer",
        body: "Correlates internal data with external data like UCC filing.",
        side: "left",
        y: 55,
      },
    },
    {
      id: "rm-4",
      image: "/features/risk-4.mp4",
      annotation: {
        title: "AI Generated Documents",
        body: "Provides next steps for automated document creation based on real-time information.",
        side: "right",
        y: 50,
      },
    },
  ],
  "loan-evaluation": [
    {
      id: "le-1",
      image: "/features/loan-1.jpg",
      annotation: {
        title: "Pre-approvals",
        body: "Real-time pre-approval for low-risk cases, isolating complex ones for review. Each result links to the rule with a confidence score.",
        side: "left",
        y: 60,
      },
    },
    {
      id: "le-2",
      image: "/features/loan-2.mp4",
      annotation: {
        title: "Lender's Co-pilot",
        body: "Use historical data to recommend competitive pricing and products.",
        side: "right",
        y: 50,
      },
    },
    {
      id: "le-3",
      image: "/features/loan-3.mp4",
      annotation: {
        title: "Evidence Layer",
        body: "Prospects undergo risk criteria checks. The system performs shadow underwriting for limits.",
        side: "left",
        y: 55,
      },
    },
    {
      id: "le-4",
      image: "/features/loan-4.mp4",
      annotation: {
        title: "AI Documents",
        body: "Relationship managers receive next steps for automated document creation.",
        side: "right",
        y: 50,
      },
    },
  ],
  "scenario-analysis": [
    {
      id: "sa-1",
      image: "/features/scenario-1.mp4",
      annotation: {
        title: "Vulnerability Potentials",
        body: "The system uses borrower data to identify vulnerabilities and prompts underwriters with tests.",
        side: "left",
        y: 60,
      },
    },
    {
      id: "sa-2",
      image: "/features/scenario-2.mp4",
      annotation: {
        title: "Visual Multi-Variate Scenario Analysis",
        body: "The system tests the loan's viability over multiple scenarios to produce recommendations.",
        side: "right",
        y: 50,
      },
    },
    {
      id: "sa-3",
      image: "/features/scenario-3.mp4",
      annotation: {
        title: "AI Generated Documents",
        body: "Generate a risk-aligned credit memo from real-time borrower information.",
        side: "left",
        y: 55,
      },
    },
  ],
};
