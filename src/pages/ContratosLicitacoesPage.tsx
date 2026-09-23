import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function ContratosLicitacoesPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="contratos" onBackHome={onBackHome} />;
}

