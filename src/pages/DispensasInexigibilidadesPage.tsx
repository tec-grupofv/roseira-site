import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function DispensasInexigibilidadesPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="dispensas-inexigibilidades" onBackHome={onBackHome} />;
}

