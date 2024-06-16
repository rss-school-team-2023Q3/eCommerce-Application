import { Pagination, PaginationItem } from '@mui/material';
import React, { useCallback } from 'react';

interface IPaginatorProps {
  pageQty: number;
  page: number;
  setPage: (num: number) => void;
}

export function Paginator({ pageQty, page, setPage }: IPaginatorProps) {
  const handleChange = useCallback(
    (_: React.ChangeEvent<unknown>, num: number) => {
      setPage(num);
    },
    [setPage]
  );

  return (
    <Pagination
      count={pageQty}
      page={page}
      onChange={handleChange}
      siblingCount={0}
      variant="outlined"
      color="primary"
      shape="rounded"
      size="large"
      renderItem={(item) => (
        <PaginationItem
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...item}
        />
      )}
    />
  );
}
