import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function AtosOficiaisPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="atos-oficiais" onBackHome={onBackHome} />;
}

