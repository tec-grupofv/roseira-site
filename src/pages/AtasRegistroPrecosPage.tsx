import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function AtasRegistroPrecosPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="atas-registro-precos" onBackHome={onBackHome} />;
}

