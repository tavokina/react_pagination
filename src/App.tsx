import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const perPageOptions = [3, 5, 10, 20] as const;

  type PerPageType = (typeof perPageOptions)[number];
  const [elementsPerPage, setElementsPerPage] = useState<PerPageType>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const firstItemOnPage = elementsPerPage * (currentPage - 1);
  const startItem = firstItemOnPage + 1;
  const endItem = Math.min(firstItemOnPage + elementsPerPage, items.length);

  const visibleItems = items.slice(
    firstItemOnPage,
    firstItemOnPage + elementsPerPage,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${endItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={elementsPerPage}
            onChange={e => {
              setElementsPerPage(Number(e.target.value) as PerPageType);
              setCurrentPage(1);
            }}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
          >
            {perPageOptions.map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        perPage={elementsPerPage}
        currentPage={currentPage}
        total={items.length}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
