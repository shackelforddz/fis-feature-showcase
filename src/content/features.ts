import type { CategoryId, FeatureScreen } from "@/lib/types";

const placeholder = "/placeholder.png";

export const features: Record<CategoryId, FeatureScreen[]> = {
  "portfolio-insights": [
    {
      id: "pi-1",
      image: placeholder,
      annotation: {
        title: "Growth Opportunities",
        body: "Leverage portfolio-wide look alike modeling to identify high-propensity leads paired with a dynamically assigned next action such as Expansion (Upsell), Retention (Defense), or Wallet Share (Cross-sell).",
        side: "left",
        y: 50,
      },
    },
    {
      id: "pi-2",
      image: "/test.mp4",
      annotation: {
        title: "Prospect Scoring",
        body: "See a propensity score surfaced next to each borrower so reps can prioritize the right conversations first.",
        side: "right",
        y: 40,
      },
    },
    {
      id: "pi-3",
      image: placeholder,
      annotation: {
        title: "Next Best Action",
        body: "A recommended action is tied to each opportunity so the next step is never ambiguous.",
        side: "left",
        y: 60,
      },
    },
  ],
  "risk-mitigation": [
    {
      id: "rm-1",
      image: placeholder,
      annotation: {
        title: "Early Warnings",
        body: "Signals surface from borrower health data so at-risk relationships are flagged before they deteriorate.",
        side: "left",
        y: 45,
      },
    },
    {
      id: "rm-2",
      image: placeholder,
      annotation: {
        title: "Mitigation Playbooks",
        body: "Pre-built strategies to mitigate, restructure, or monetize — picked to fit each warning.",
        side: "right",
        y: 55,
      },
    },
  ],
  "loan-evaluation": [
    {
      id: "le-1",
      image: placeholder,
      annotation: {
        title: "Pre-Approval Linked to Evidence",
        body: "Each pre-approval is traceable to the data and documents that support it.",
        side: "left",
        y: 50,
      },
    },
    {
      id: "le-2",
      image: placeholder,
      annotation: {
        title: "Auto-Generated Documents",
        body: "Term sheets and credit memos generated on demand with real-time data.",
        side: "right",
        y: 50,
      },
    },
  ],
  "scenario-analysis": [
    {
      id: "sa-1",
      image: placeholder,
      annotation: {
        title: "Unstructured Data Extraction",
        body: "Automated insight extraction reads unstructured inputs so scenarios can be modeled instantly.",
        side: "left",
        y: 45,
      },
    },
    {
      id: "sa-2",
      image: placeholder,
      annotation: {
        title: "Real-Time Stress Testing",
        body: "Change a variable and see deal structure impact immediately — fully traceable.",
        side: "right",
        y: 55,
      },
    },
  ],
};
