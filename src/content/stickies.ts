import type { CategoryId } from "@/lib/types";

export type Sticky = {
  id: string;
  quote: string;
  name: string;
  company: string;
};

export const stickies: Record<CategoryId, Sticky[]> = {
  "portfolio-insights": [
    {
      id: "pi-1",
      quote: "Lookalike modeling surfaced three upsell candidates I would have missed.",
      name: "Maya R.",
      company: "Cascade Capital",
    },
    {
      id: "pi-2",
      quote: "Generated docs cut my pre-meeting prep from an hour to ten minutes.",
      name: "Devon K.",
      company: "Northpoint Lending",
    },
    {
      id: "pi-3",
      quote: "Cross-sell suggestions actually match what we'd manually pick.",
      name: "Priya S.",
      company: "Meridian Bank",
    },
    {
      id: "pi-4",
      quote: "Wish the identity match showed confidence at a glance.",
      name: "Jordan T.",
      company: "Halcyon Group",
    },
    {
      id: "pi-5",
      quote: "Love seeing the full borrower picture in one view.",
      name: "Sam W.",
      company: "Ridgeline Finance",
    },
    {
      id: "pi-6",
      quote: "Could the doc preview let me edit inline before sending?",
      name: "Lena F.",
      company: "Beacon Trust",
    },
  ],
  "risk-mitigation": [
    {
      id: "rm-1",
      quote: "External signals caught a covenant breach two weeks early.",
      name: "Carlos M.",
      company: "Summit Credit",
    },
    {
      id: "rm-2",
      quote: "Restructure suggestions feel like a senior analyst riding shotgun.",
      name: "Aisha B.",
      company: "Linden Bank",
    },
    {
      id: "rm-3",
      quote: "Need finer control on which risk signals trigger an alert.",
      name: "Henry G.",
      company: "Crestmark",
    },
    {
      id: "rm-4",
      quote: "Monetization paths are a great addition — keep them coming.",
      name: "Talia O.",
      company: "Vanguard Lending",
    },
    {
      id: "rm-5",
      quote: "The borrower health score is the first thing I check now.",
      name: "Ravi P.",
      company: "Foundry Capital",
    },
    {
      id: "rm-6",
      quote: "Could we get a weekly digest of new warnings by portfolio?",
      name: "Nina C.",
      company: "Hearthstone",
    },
  ],
  "loan-evaluation": [
    {
      id: "le-1",
      quote: "Pre-approvals with evidence saved my underwriter half a day.",
      name: "Owen H.",
      company: "Pinecrest Bank",
    },
    {
      id: "le-2",
      quote: "Generated memos read like our own — barely needed edits.",
      name: "Mira L.",
      company: "Kestrel Finance",
    },
    {
      id: "le-3",
      quote: "Want a side-by-side compare for two candidate loans.",
      name: "Felix D.",
      company: "Brightwater",
    },
    {
      id: "le-4",
      quote: "Evidence trail is the killer feature for committee review.",
      name: "Sasha N.",
      company: "Ironwood Credit",
    },
    {
      id: "le-5",
      quote: "Add an option to flag missing docs before submission.",
      name: "Bea V.",
      company: "Anchor Bank",
    },
    {
      id: "le-6",
      quote: "Confidence scoring on pre-approvals would close the loop.",
      name: "Quinn A.",
      company: "Lakeshore Lending",
    },
  ],
  "scenario-analysis": [
    {
      id: "sa-1",
      quote: "Real-time stress testing changed how we structure deals.",
      name: "Theo J.",
      company: "Granite Partners",
    },
    {
      id: "sa-2",
      quote: "Pulling variables from the deal automatically — chef's kiss.",
      name: "Imani R.",
      company: "Cornerstone",
    },
    {
      id: "sa-3",
      quote: "Need to save and revisit scenarios across sessions.",
      name: "Marco E.",
      company: "Riverstone",
    },
    {
      id: "sa-4",
      quote: "Visual diffs between scenarios are insanely useful.",
      name: "Eve K.",
      company: "Birchwood Bank",
    },
    {
      id: "sa-5",
      quote: "Could we layer in macro forecasts as an input?",
      name: "Kai S.",
      company: "Tidewater Credit",
    },
    {
      id: "sa-6",
      quote: "Insight extraction caught a clause my team had glossed over.",
      name: "Rosa M.",
      company: "Ember Capital",
    },
  ],
};
