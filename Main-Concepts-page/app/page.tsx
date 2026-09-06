import ConceptClient from "./concept-client";

type Concept = "signature" | "institutional" | "fleet" | "elite";

const conceptIds: Concept[] = ["signature", "institutional", "fleet", "elite"];

function getInitialConcept(value: string | string[] | undefined): Concept {
  const concept = Array.isArray(value) ? value[0] : value;
  return conceptIds.includes(concept as Concept) ? (concept as Concept) : "signature";
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ concept?: string | string[] }>;
}) {
  const params = await searchParams;
  return <ConceptClient initialActive={getInitialConcept(params.concept)} />;
}
