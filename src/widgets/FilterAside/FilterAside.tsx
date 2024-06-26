import { ProductProjection } from '@commercetools/platform-sdk';
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import './FilterAside.modules.css';
import IProductData from 'pages/App/types/interfaces/IProductData';
import { ChangeEvent, useEffect, useState } from 'react';
import { LIMIT_LARGE, LIMIT_TABLET, LIMIT_MOBILE } from 'shared/constants';
import getFilterProducts from 'shared/utils/getFilter';
import getProducts from 'shared/utils/getProducts';
import { toastError } from 'shared/utils/notifications';
import {
  setProductsListArray,
  setProductsProjectionArray,
} from 'shared/utils/setProductsArray';

interface IFilterInterface {
  props: {
    filteredList: (productArray: IProductData[]) => void;
    setLoadState: (state: boolean) => void;
    setTotal: (total: number) => void;
    offset: number;
    resetPage: () => void;
  };
}

function FilterAside({ props }: IFilterInterface) {
  const [manufacture, setManufacture] = useState('All');
  const [sort, setSort] = useState('name.en asc');
  const [searchValue, setSearchValue] = useState('');
  const [isOnSale, setIsOnSale] = useState(false);
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(2000);
  const [filterQuery, setFilterQuery] = useState([] as string[]);
  const onSaleQuery = 'variants.prices.discounted:exists';
  const manufactureQuery = `variants.attributes.manufacture:"${manufacture}"`;
  const priceQuery = `variants.price.centAmount: range(${minCost * 100} to ${maxCost * 100})`;
  let mediaQueryLimit = LIMIT_MOBILE;
  const isLargeScreen = useMediaQuery('(min-width: 1174px)');
  const isTabletScreen = useMediaQuery('(min-width: 890px)');

  if (isTabletScreen) mediaQueryLimit = LIMIT_TABLET;

  if (isLargeScreen) mediaQueryLimit = LIMIT_LARGE;

  const handleChangeSale = (event: ChangeEvent<HTMLInputElement>) => {
    setIsOnSale(event.target.checked);
  };
  const handleChangeManufacture = (
    event: SelectChangeEvent<typeof manufacture>,
  ) => {
    setManufacture(event.target.value);
  };

  const resetFilters = async () => {
    props.setLoadState(true);
    setManufacture('All');
    setIsOnSale(false);
    setMinCost(0);
    setMaxCost(2000);
    setSort('name.en asc');
    setFilterQuery([]);
    setSearchValue('');
    props.resetPage();
    const filtered = await getProducts(
      '',
      'masterData.current.name.en asc',
      0,
      mediaQueryLimit,
    );

    props.setTotal(
      Math.ceil((filtered?.body?.total ?? mediaQueryLimit) / mediaQueryLimit),
    );
    props.filteredList(setProductsListArray(filtered?.body.results));
    props.setLoadState(false);
  };

  const handleChangeSort = async (event: SelectChangeEvent<typeof sort>) => {
    props.setLoadState(true);
    setSort(event.target.value);
    const response = await getFilterProducts(
      filterQuery,
      event.target.value,
      searchValue,
      props.offset,
      mediaQueryLimit,
    );

    const filtered = setProductsProjectionArray(
      response?.body.results as ProductProjection[],
    );

    if (filtered) props.filteredList(filtered);

    props.setLoadState(false);
  };

  const filterProductsList = async () => {
    props.setLoadState(true);
    const filterArray = [];

    if (isOnSale) filterArray.push(onSaleQuery);

    if (manufacture !== 'All') filterArray.push(manufactureQuery);

    filterArray.push(priceQuery);
    setFilterQuery(filterArray);
    const response = await getFilterProducts(
      filterArray,
      sort,
      searchValue,
      0,
      mediaQueryLimit,
    );

    const filtered = setProductsProjectionArray(
      response?.body.results as ProductProjection[],
    );

    if (filtered) props.filteredList(filtered);

    props.setTotal(
      Math.ceil((response?.body?.total ?? mediaQueryLimit) / mediaQueryLimit),
    );
    props.setLoadState(false);
  };

  const handleSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {}, [sort]);

  useEffect(() => {
    props.setLoadState(true);
    const fetchDataUE = async () => {
      const response = await getFilterProducts(
        filterQuery,
        sort,
        searchValue,
        props.offset,
        mediaQueryLimit,
      );

      return response;
    };

    fetchDataUE()
      .then((res) => res?.body)
      .then((body) => {
        const filtered = setProductsProjectionArray(
          body?.results as ProductProjection[],
        );

        if (filtered) props.filteredList(filtered);

        props.setTotal(
          Math.ceil((body?.total ?? mediaQueryLimit) / mediaQueryLimit),
        );
        props.setLoadState(false);
      })
      .catch(() => toastError('Don`t fetch data'));
  }, [props.offset, mediaQueryLimit]);

  return (
    <aside>
      <Paper className="catalog-aside" elevation={24}>
        <TextField
          id="search"
          label="Search"
          value={searchValue}
          onChange={handleSearchValue}
          variant="outlined"
        />
        <FormControl className="sort-select">
          <InputLabel id="sort">Sort</InputLabel>
          <Select
            labelId="sort"
            value={sort}
            label="Sort"
            onChange={handleChangeSort}
          >
            <MenuItem value="name.en asc">Name A-Z</MenuItem>
            <MenuItem value="name.en desc">Name Z-A</MenuItem>
            <MenuItem value="price asc">Price ↑</MenuItem>
            <MenuItem value="price desc">Price ↓</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          checked={isOnSale}
          value="start"
          control={(
            <Switch
              checked={isOnSale}
              onChange={handleChangeSale}
              color="primary"
            />
          )}
          label="On sale!"
          labelPlacement="end"
        />
        <Divider variant="middle" />
        <span>Manufacturer</span>
        <FormControl className="manufacture-select">
          <InputLabel id="manufacturer">Manufacturer</InputLabel>
          <Select
            labelId="manufacturer"
            value={manufacture}
            label="Manufacturer"
            onChange={handleChangeManufacture}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Palit">Palit</MenuItem>
            <MenuItem value="ASUS">ASUS</MenuItem>
            <MenuItem value="Sapphire">Sapphire</MenuItem>
            <MenuItem value="be quiet!">be quiet!</MenuItem>
            <MenuItem value="ASRock">ASRock</MenuItem>
            <MenuItem value="AMD">AMD</MenuItem>
            <MenuItem value="MSI">MSI</MenuItem>
            <MenuItem value="Intel">Intel</MenuItem>
            <MenuItem value="Seagate">Seagate</MenuItem>
            <MenuItem value="Toshiba">Toshiba</MenuItem>
            <MenuItem value="DeepCool">DeepCool</MenuItem>
          </Select>
        </FormControl>
        <Divider variant="middle" />
        <span>Price</span>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            label="min"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            sx={{ width: '90px' }}
            value={minCost}
            onChange={(e) => {
              setMinCost(Number(e.target.value));
            }}
          />
          <Typography>-</Typography>
          <TextField
            label="max"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ width: '90px' }}
            value={maxCost}
            onChange={(e) => {
              setMaxCost(Number(e.target.value));
            }}
          />
        </Stack>
        <Divider variant="middle" />
        <div className="aside-buttons">
          <Button onClick={filterProductsList} variant="contained">
            Filter
          </Button>
          <Button onClick={resetFilters} variant="contained">
            Reset
          </Button>
        </div>
      </Paper>
    </aside>
  );
}

export default FilterAside;
