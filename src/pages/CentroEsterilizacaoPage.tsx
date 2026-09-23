import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function CentroEsterilizacaoPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="centro-esterilizacao" onBackHome={onBackHome} />;
}

