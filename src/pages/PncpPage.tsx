import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function PncpPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="pncp" onBackHome={onBackHome} />;
}

