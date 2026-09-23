import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function ComunicadosPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="comunicados" onBackHome={onBackHome} />;
}

