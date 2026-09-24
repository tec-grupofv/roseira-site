import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function LeilaoPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="leilao" onBackHome={onBackHome} />;
}

