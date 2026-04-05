import { getNumbers } from '../../utils';

interface PaginationProps {
  perPage: number;
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  perPage,
  currentPage,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageSelector = getNumbers(1, totalPages).map(page => (
    <li
      key={page}
      className={`page-item ${page === currentPage ? 'active' : ''}`}
    >
      <a
        data-cy="pageLink"
        className="page-link"
        href={`#${page}`}
        onClick={() => onPageChange(page)}
      >
        {page}
      </a>
    </li>
  ));

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage === 1) {
              return;
            }

            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {pageSelector}

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={() => {
            if (currentPage === totalPages) {
              return;
            }

            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
