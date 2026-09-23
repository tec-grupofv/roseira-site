import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function BancoPovoPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="banco-povo" onBackHome={onBackHome} />;
}

