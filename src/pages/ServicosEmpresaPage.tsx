import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function ServicosEmpresaPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="servicos-empresa" onBackHome={onBackHome} />;
}

