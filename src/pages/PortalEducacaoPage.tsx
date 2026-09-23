import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function PortalEducacaoPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="portal-educacao" onBackHome={onBackHome} />;
}

