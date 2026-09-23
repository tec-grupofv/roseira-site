import type { ReactNode } from "react";

type HomePageProps = {
  children: ReactNode;
};

export default function HomePage({ children }: HomePageProps) {
  return <div className="home-page">{children}</div>;
}
