export function getPaginationPages({
  totalPages,
  currentPage,
  paginationPages = 5,
}: {
  totalPages: number;
  currentPage: number;
  paginationPages?: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const mid = (paginationPages - 1) / 2;

  if (totalPages <= paginationPages) {
    return pages;
  }

  if (currentPage >= totalPages - mid) {
    const start = totalPages - paginationPages;
    const end = totalPages;

    return pages.slice(start, end);
  }

  if (currentPage >= paginationPages - 1) {
    const start = currentPage - paginationPages + mid;
    const end = currentPage + mid;

    return pages.slice(start, end);
  }

  return pages.slice(0, paginationPages);
}
