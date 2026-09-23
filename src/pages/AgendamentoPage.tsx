import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function AgendamentoPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="agendamento" onBackHome={onBackHome} />;
}

