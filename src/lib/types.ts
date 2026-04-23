export type CategoryId =
  | "portfolio-insights"
  | "risk-mitigation"
  | "loan-evaluation"
  | "scenario-analysis";

export type Category = {
  id: CategoryId;
  number: number;
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

export type Feedback = {
  id: string;
  category_id: CategoryId;
  quote: string;
  name: string;
  company: string;
  created_at: string;
};

export type WizardQuestion =
  | {
      id: string;
      type: "text" | "textarea" | "one-word";
      prompt: string;
      placeholder?: string;
      goesToBoard?: boolean;
    }
  | {
      id: string;
      type: "choice";
      prompt: string;
      options: { value: string; label: string }[];
      goesToBoard?: boolean;
    }
  | {
      id: string;
      type: "scale";
      prompt: string;
      min: number;
      max: number;
      minLabel: string;
      maxLabel: string;
      goesToBoard?: boolean;
    };

export type WizardAnswers = {
  context: string;
  oneWord: string;
  disappointment:
    | "very_disappointed"
    | "somewhat_disappointed"
    | "not_disappointed";
  comfort: string;
  docsRating: number;
  wishlist: string;
};

export type WizardSubmission = {
  category_id: CategoryId;
  name: string;
  company: string;
  answers: WizardAnswers;
};
