import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function AcessaSpPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="acessa-sp" onBackHome={onBackHome} />;
}

