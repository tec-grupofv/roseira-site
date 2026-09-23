import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function BoletinsOficiaisPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="boletins-oficiais" onBackHome={onBackHome} />;
}

