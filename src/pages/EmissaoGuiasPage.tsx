import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function EmissaoGuiasPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="emissao-guias" onBackHome={onBackHome} />;
}

