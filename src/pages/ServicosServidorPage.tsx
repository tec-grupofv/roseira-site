import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function ServicosServidorPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="servicos-servidor" onBackHome={onBackHome} />;
}

