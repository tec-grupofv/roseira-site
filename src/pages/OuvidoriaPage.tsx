import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function OuvidoriaPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="ouvidoria" onBackHome={onBackHome} />;
}

