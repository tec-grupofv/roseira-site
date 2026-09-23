import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function TelefonesEnderecosPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="telefones-enderecos" onBackHome={onBackHome} />;
}

