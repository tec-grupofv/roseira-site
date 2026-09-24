import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function PlanoDiretorPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="plano-diretor" onBackHome={onBackHome} />;
}

