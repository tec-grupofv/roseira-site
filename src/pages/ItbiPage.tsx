import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function ItbiPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="itbi" onBackHome={onBackHome} />;
}

