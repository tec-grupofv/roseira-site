import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function BolsaFamiliaPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="bolsa-familia" onBackHome={onBackHome} />;
}

