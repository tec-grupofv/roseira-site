import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function PlanoArborizacaoPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="plano-arborizacao" onBackHome={onBackHome} />;
}

