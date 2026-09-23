import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function NotaFiscalEletronicaPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="nota-fiscal-eletronica" onBackHome={onBackHome} />;
}

