import RequirementPage, { type RequirementPageConfig } from "./RequirementPage";

export default function ConselhoTutelarPage({ page, onBackHome }: { page: RequirementPageConfig; onBackHome: () => void }) {
  return <RequirementPage page={page} slug="conselho-tutelar" onBackHome={onBackHome} />;
}

