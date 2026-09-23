import { ChevronRight, Home } from "lucide-react";

export type SiteBreadcrumbItem = {
  label: string;
  onClick?: () => void;
};

export default function SiteBreadcrumb({ items }: { items: SiteBreadcrumbItem[] }) {
  return (
    <nav className="site-breadcrumb" aria-label="Caminho de navegação">
      <ol>
        {items.map((item, index) => {
          const isHome = index === 0;
          const isCurrent = index === items.length - 1;
          const content = (
            <>
              {isHome && <Home aria-hidden="true" />}
              <span>{item.label}</span>
            </>
          );

          return (
            <li key={`${item.label}-${index}`}>
              {index > 0 && <ChevronRight className="site-breadcrumb-separator" aria-hidden="true" />}
              {item.onClick && !isCurrent ? (
                <button type="button" onClick={item.onClick} title={item.label} className={isHome ? "site-breadcrumb-home" : undefined}>
                  {content}
                </button>
              ) : (
                <span className={[isHome ? "site-breadcrumb-home" : "", isCurrent ? "site-breadcrumb-current" : ""].filter(Boolean).join(" ")}>
                  {content}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
