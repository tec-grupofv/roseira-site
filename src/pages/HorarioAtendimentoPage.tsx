import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function HorarioAtendimentoPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="horario-atendimento" onBackHome={onBackHome} />;
}

