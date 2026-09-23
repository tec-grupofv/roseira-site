import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function ServicosCidadaoPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="servicos-cidadao" onBackHome={onBackHome} />;
}

