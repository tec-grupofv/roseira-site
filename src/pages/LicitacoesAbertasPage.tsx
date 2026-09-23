import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function LicitacoesAbertasPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="em-aberto" onBackHome={onBackHome} />;
}

