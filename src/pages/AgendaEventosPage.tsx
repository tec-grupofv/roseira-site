import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function AgendaEventosPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="eventos" onBackHome={onBackHome} />;
}

