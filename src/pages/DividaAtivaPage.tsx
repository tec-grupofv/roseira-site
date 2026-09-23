import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function DividaAtivaPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="divida-ativa" onBackHome={onBackHome} />;
}

