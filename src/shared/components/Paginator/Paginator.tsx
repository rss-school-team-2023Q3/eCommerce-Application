import { Pagination, PaginationItem, useTheme } from '@mui/material';
import React, { useCallback } from 'react';

interface IPaginatorProps {
  pageQty: number;
  page: number;
  setPage: (num: number) => void;
}

export function Paginator({ pageQty, page, setPage }: IPaginatorProps) {
  const theme = useTheme();
  const handleChange = useCallback(
    (_: React.ChangeEvent<unknown>, num: number) => {
      setPage(num);
    },
    [setPage],
  );

  return (
    <Pagination
      sx={{ backgroundColor: 'tranaparent' }}
      count={pageQty}
      page={page}
      onChange={handleChange}
      siblingCount={0}
      variant="outlined"
      // color="primary"
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem
          className="pagination-item"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...item}
          sx={{
            m: '0 10px',
            p: '1rem',
            backgroundColor: item.selected
              ? '#646cff!important'
              : `${theme.palette.background.default}!important`,
            color: 'theme.palette.background.default',
            fontSize: '1.5rem',
            fontWeight: 900,
          }}
        />
      )}
    />
  );
}
