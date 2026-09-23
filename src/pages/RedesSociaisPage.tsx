import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function RedesSociaisPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="redes-sociais" onBackHome={onBackHome} />;
}

