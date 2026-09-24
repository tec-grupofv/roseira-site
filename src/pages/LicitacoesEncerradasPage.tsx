import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function LicitacoesEncerradasPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="encerradas" onBackHome={onBackHome} />;
}

