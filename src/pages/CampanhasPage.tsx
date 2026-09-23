import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function CampanhasPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="campanhas" onBackHome={onBackHome} />;
}

