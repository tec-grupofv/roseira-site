import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function EstruturaAdministrativaPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="estrutura-administrativa" onBackHome={onBackHome} />;
}

