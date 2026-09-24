import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function LeiOrganicaMunicipalPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="lei-organica-municipal" onBackHome={onBackHome} />;
}

