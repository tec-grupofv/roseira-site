import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function HorariosAtendimentoPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="horarios-atendimento" onBackHome={onBackHome} />;
}

