import { Showcase } from "@/components/showcase/showcase";
import { listFeedback } from "@/app/actions/feedback";
import { categories } from "@/content/categories";
import type { CategoryId, Feedback } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const results = await Promise.all(
    categories.map(
      (c) => listFeedback(c.id, 9).then((r) => [c.id, r] as const)
    )
  );
  const initialFeedback = Object.fromEntries(results) as Record<
    CategoryId,
    Feedback[]
  >;

  return <Showcase initialFeedback={initialFeedback} />;
}
