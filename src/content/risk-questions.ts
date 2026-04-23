import type { WizardQuestion } from "@/lib/types";

export const riskQuestions: WizardQuestion[] = [
  {
    id: "context",
    type: "textarea",
    prompt:
      "How would you describe your approach to evaluating an existing loan today?",
  },
  {
    id: "oneWord",
    type: "one-word",
    prompt:
      "What is one word you would use to describe what proactive risk mitigation offers?",
    placeholder: "One word",
  },
  {
    id: "disappointment",
    type: "choice",
    prompt:
      "If you were to use proactive risk mitigation for 2-3 months and then someone took it away, how would you feel?",
    options: [
      { value: "very_disappointed", label: "Very disappointed" },
      { value: "somewhat_disappointed", label: "Somewhat disappointed" },
      { value: "not_disappointed", label: "Not disappointed" },
    ],
  },
  {
    id: "comfort",
    type: "textarea",
    prompt:
      "If the system flagged a risky profile for you and recommended an action, what information would you need to see to feel comfortable acting on it?",
  },
  {
    id: "docsRating",
    type: "scale",
    prompt:
      "On a scale where 1 is a dealbreaker for your reputation and 5 is a strategic win for your speed, where do AI-drafted documents land for you?",
    min: 1,
    max: 5,
    minLabel: "Dealbreaker for reputation",
    maxLabel: "Strategic win for speed",
  },
  {
    id: "wishlist",
    type: "textarea",
    prompt:
      "Is there anything you wish you could add or take away from pro-active risk mitigation?",
    goesToBoard: true,
  },
];
