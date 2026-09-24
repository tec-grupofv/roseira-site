import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function CartaServicosPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="carta-servicos" onBackHome={onBackHome} />;
}

