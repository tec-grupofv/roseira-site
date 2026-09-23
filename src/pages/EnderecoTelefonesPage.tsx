import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function EnderecoTelefonesPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="endereco-telefones" onBackHome={onBackHome} />;
}

