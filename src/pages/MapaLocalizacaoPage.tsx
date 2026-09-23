import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function MapaLocalizacaoPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="mapa-localizacao" onBackHome={onBackHome} />;
}

