import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function CodigoTributarioPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="codigo-tributario" onBackHome={onBackHome} />;
}

