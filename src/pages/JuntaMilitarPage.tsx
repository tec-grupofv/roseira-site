import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function JuntaMilitarPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="junta-militar" onBackHome={onBackHome} />;
}

