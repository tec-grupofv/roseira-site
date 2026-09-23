import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function FornecedoresPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="fornecedores" onBackHome={onBackHome} />;
}

