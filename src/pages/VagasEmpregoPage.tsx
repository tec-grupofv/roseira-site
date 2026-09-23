import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function VagasEmpregoPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="vagas-emprego" onBackHome={onBackHome} />;
}

