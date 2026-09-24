import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function CovidPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="covid" onBackHome={onBackHome} />;
}

