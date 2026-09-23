import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function ConcorrenciaPublicaPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="concorrencia-publica" onBackHome={onBackHome} />;
}

