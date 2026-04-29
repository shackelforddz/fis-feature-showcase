# Feedback forms

Each category has its own wizard. The questions share a structure across categories — only the wording and a few options differ.

## Common shape

Every wizard has the same six question slots in this order:

| # | id | type | Goes to wall? |
| - | - | - | - |
| 1 | `context` | `choice` (single-select) | no |
| 2 | `oneWord` | `one-word` (single token) | no |
| 3 | `disappointment` | `choice` | no |
| 4 | `comfort` | `textarea` | no |
| 5 | `docsRating` | `scale` (1–5) | no |
| 6 | `wishlist` | `textarea` | **yes** (`goesToBoard: true`) |

After the six questions, the user enters their **name** and **company**. Submission writes one row to `survey_responses` and one row to `feedback` for each question with `goesToBoard: true`.

### Shared option sets

**`context`** — same five options across every category:

- Manual / Random (`manual_random`)
- Siloed / disconnected (`siloed`)
- Involves bringing together multiple data feeds (`multiple_data_feeds`)
- Involves viewing a dashboard of synthesized insights (`synthesized_dashboard`)
- Predictive / Agentic (`predictive_agentic`)

**`disappointment`** — same three options across every category:

- Very disappointed (`very_disappointed`)
- Somewhat disappointed (`somewhat_disappointed`)
- Not disappointed (`not_disappointed`)

**`docsRating`** — 1–5 scale, anchored:

- 1 — Dealbreaker for reputation
- 5 — Strategic win for speed

---

## Portfolio Insights

Source: `src/content/portfolio-questions.ts`

1. **context** — *When your team reaches out to a prospect today, how would you describe the trigger that got them there?* (shared `context` options)
2. **oneWord** — *What is one word you would use to describe what portfolio insights offers?*
3. **disappointment** — *If you were to use portfolio insights for 2-3 months and then someone took it away, how would you feel?* (shared `disappointment` options)
4. **comfort** — *If the system flags an opportunity for you, what information would you need to see about that opportunity to feel comfortable calling a client?*
5. **docsRating** — *On a scale where 1 is a dealbreaker for your reputation and 5 is a strategic win for your speed, where do AI drafted documents land for you?*
6. **wishlist** — *Is there anything that you would add or take away from portfolio insights?* — posts to wall

---

## Risk Mitigation

Source: `src/content/risk-questions.ts`

1. **context** — *How would you describe your approach to evaluating an existing loan today?* (shared `context` options)
2. **oneWord** — *What is one word you would use to describe what proactive risk mitigation offers?*
3. **disappointment** — *If you were to use proactive risk mitigation for 2-3 months and then someone took it away, how would you feel?* (shared `disappointment` options)
4. **comfort** — *If the system flagged a risky profile for you and recommended an action, what information would you need to see to feel comfortable acting on it?*
5. **docsRating** — *On a scale where 1 is a dealbreaker for your reputation and 5 is a strategic win for your speed, where do AI-drafted documents land for you?*
6. **wishlist** — *Is there anything you wish you could add or take away from pro-active risk mitigation?* — posts to wall

---

## Loan Evaluation Center

Source: `src/content/loan-evaluation-questions.ts`

1. **context** — *How would you describe your approach to getting to a credit decision today?* (shared `context` options)
2. **oneWord** — *What is one word you would use to describe what proactive loan evaluation center offers?*
3. **disappointment** — *If you were to use this for 2-3 months and then someone took it away, how would you feel?* (shared `disappointment` options)
4. **comfort** — *If the system flagged a loan as a likely approval, what information would you need to see to go forward with the drafting of a credit memo for this loan?*
5. **docsRating** — *On a scale where 1 is a dealbreaker for your reputation and 5 is a strategic win for your speed, where do AI drafted documents land for you?*
6. **wishlist** — *Is there anything that you would add or take away from the loan evaluation center?* — posts to wall

---

## Visual Scenario Analysis

Source: `src/content/scenario-analysis-questions.ts`

1. **context** — *How would you describe your approach to evaluating & underwriting a loan today?* (shared `context` options)
2. **oneWord** — *What is one word you would use to describe what the scenario analysis tool offers?*
3. **disappointment** — *If you were to use the scenario analysis tool for 2-3 months and then someone took it away, how would you feel?* (shared `disappointment` options)
4. **comfort** — *If the system produces an approval with a set of mitigations, what evidence would you need to see to move this forward to the credit committee?*
5. **docsRating** — *On a scale where 1 is a dealbreaker for your reputation and 5 is a strategic win for your speed, where do AI drafted documents land for you?*
6. **wishlist** — *Is there anything that you would add or take away from the scenario analysis tool?* — posts to wall

---

## Validation

Defined in `src/lib/feedback.ts` (`wizardSubmissionSchema`):

- `context`, `comfort`, `wishlist` — non-empty, ≤ 500 chars
- `oneWord` — non-empty, ≤ 40 chars, must contain no whitespace
- `disappointment` — must be one of the three enum values
- `docsRating` — integer in `[1, 5]`
- `name`, `company` — non-empty, ≤ 80 chars
