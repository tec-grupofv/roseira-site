import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function ChamadaPublicaPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="chamada-publica" onBackHome={onBackHome} />;
}

