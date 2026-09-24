import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function ProtocolosPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="protocolos" onBackHome={onBackHome} />;
}

