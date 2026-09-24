import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function PregaoPresencialPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="pregao-presencial" onBackHome={onBackHome} />;
}

