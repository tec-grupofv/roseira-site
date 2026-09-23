import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function LeiAldirBlancPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="lei-aldir-blanc" onBackHome={onBackHome} />;
}

