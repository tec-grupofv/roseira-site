import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function TomadaPrecosPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="tomada-de-precos" onBackHome={onBackHome} />;
}

