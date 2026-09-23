import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function AditivosPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="aditivos" onBackHome={onBackHome} />;
}

