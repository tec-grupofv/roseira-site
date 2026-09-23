import { Search } from "lucide-react";

export default function SearchYearFilter({ query, onQueryChange, year, onYearChange, years, placeholder = "Buscar por número ou descrição..." }: { query: string; onQueryChange: (value: string) => void; year: string; onYearChange: (value: string) => void; years: string[]; placeholder?: string }) {
  return <div className="concursos-filter-grid"><label><span className="site-caps-title">Número / Descrição</span><div className="concursos-input"><Search aria-hidden="true" /><input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={placeholder} /></div></label><label><span className="site-caps-title">Ano</span><select value={year} onChange={(event) => onYearChange(event.target.value)}><option value="">Todos os anos</option>{years.map((itemYear) => <option key={itemYear}>{itemYear}</option>)}</select></label></div>;
}
