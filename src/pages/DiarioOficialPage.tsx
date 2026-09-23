import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function DiarioOficialPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="diario-oficial" onBackHome={onBackHome} />;
}

