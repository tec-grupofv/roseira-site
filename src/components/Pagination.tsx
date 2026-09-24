import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalItems, pageSize = 6, onPageChange }: { currentPage: number; totalItems: number; pageSize?: number; onPageChange: (page: number) => void }) {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;

  return (
    <nav className="site-pagination" aria-label="Paginação">
      <button type="button" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} aria-label="Página anterior" title="Página anterior"><ChevronLeft aria-hidden="true" /></button>
      <div className="site-pagination-pages">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button key={page} type="button" className={page === currentPage ? "site-pagination-active" : ""} aria-current={page === currentPage ? "page" : undefined} onClick={() => onPageChange(page)}>{page}</button>
        ))}
      </div>
      <button type="button" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} aria-label="Próxima página" title="Próxima página"><ChevronRight aria-hidden="true" /></button>
    </nav>
  );
}
