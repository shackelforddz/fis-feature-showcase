export type CategoryId =
  | "portfolio-insights"
  | "risk-mitigation"
  | "loan-evaluation"
  | "scenario-analysis";

export type Category = {
  id: CategoryId;
  name: string;
  shortLabel: string;
  description: string;
  prompt: string;
};

export type FeatureAnnotation = {
  title: string;
  body: string;
  side: "left" | "right";
  y?: number;
};

export type FeatureScreen = {
  id: string;
  image: string;
  annotation: FeatureAnnotation;
};
