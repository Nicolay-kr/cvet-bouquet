import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import BouquetCard from './BouquetCard/BouquetCard';
import BreadCrumbs from './breadcrubs/BreadCrumbs';
import BouquetSort from './BouquetSort/BouquetSort';
import PriceFilter from './PriceFilter';
import size from '../utils/size';
import { useRouter } from 'next/router';

const BouquetListPage = ({
  category,
  breadCrumbsList,
  generalInfo,
}) => {
  console.log(category.bouqets)
  const defaultBouquetsList = category?.bouqets;
  const [bouquetsList, setBouquetsList] = React.useState(defaultBouquetsList);
  const router = useRouter();

  const [value, setValue] = React.useState(
    router.query.price ? router.query.price : 'all'
  );

  const sortingFunction = {
    price: handlePriceSort,
    novelty: handleNoveltySort,
    popularity: handlePopularitySort,
  };

  const [sortBy, setSortBy] = React.useState(
    router.query.sortBy
      ? {
          parametr: router.query.sortBy,
          type: 'acs',
          func: sortingFunction[router.query.sortBy],
        }
      : { parametr: 'popularity', type: 'none', func: handlePopularitySort }
  );

  const handleChangePrice = (value) => {
    setValue(value);
    router.push(
      {
        pathname: router.pathname,
        query: !(value === 'all')
          ? { price: `${value}`, slug: router.query.slug }
          : router.query.slug? { slug: router.query.slug }:null
      },
      undefined,
      { shallow: true }
    );

    let arrValue = [];

    if (value === 'primary') {
      arrValue = [1001, 10000];
    } else {
      arrValue = value.split('-');
    }
    if (value === 'all') {
      console.log();
      let sortedBouquetsList = handlePriceSort(defaultBouquetsList);
      sortedBouquetsList = sortBy.func(sortedBouquetsList);
      setBouquetsList([...sortedBouquetsList]);
    } else {
      let sortedBouquetsList = defaultBouquetsList.filter(
        (bouquet) =>
          arrValue[0] <= +bouquet.price && +bouquet.price <= +arrValue[1]
      );
      sortedBouquetsList = sortBy.func(sortedBouquetsList);

      setBouquetsList([...sortedBouquetsList]);
    }
  };

  useEffect(() => {
    setBouquetsList([...defaultBouquetsList]);
  }, [defaultBouquetsList]);

  useEffect(() => {
    handleChangePrice(value);
  }, []);

  function handlePriceSort(bouquets) {
    const sortedBouquetsList = bouquets.sort((a, b) => a.price - b.price);
    const sortedBouquetsListDesc = [...sortedBouquetsList].reverse();
    if (sortBy.parametr === 'price' && sortBy.type === 'desc') {
      setSortBy({ parametr: 'price', type: 'acs', func: handlePriceSort });
      return sortedBouquetsList;
    } else if (sortBy.parametr === 'price' && sortBy.type === 'acs') {
      setSortBy({ parametr: 'price', type: 'desc', func: handlePriceSort });
      return sortedBouquetsListDesc;
    } else {
      setSortBy({ parametr: 'price', type: 'acs', func: handlePriceSort });
      return sortedBouquetsList;
    }
  }

  function handleNoveltySort(bouquets) {
    const sortedBouquetsList = bouquets.sort(
      (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
    );
    const sortedBouquetsListDesc = [...sortedBouquetsList].reverse();
    if (sortBy.parametr === 'novelty' && sortBy.type === 'desc') {
      setSortBy({ parametr: 'novelty', type: 'acs', func: handleNoveltySort });
      return sortedBouquetsList;
    } else if (sortBy.parametr === 'novelty' && sortBy.type === 'acs') {
      setSortBy({ parametr: 'novelty', type: 'desc', func: handleNoveltySort });
      return sortedBouquetsListDesc;
    } else {
      setSortBy({ parametr: 'novelty', type: 'acs', func: handleNoveltySort });
      return sortedBouquetsList;
    }
  }

  function handlePopularitySort(bouquets) {
    const sortedBouquetsList = [...bouquets];
    const sortedBouquetsListDesc = [...sortedBouquetsList].reverse();
    if (sortBy.parametr === 'popularity' && sortBy.type === 'desc') {
      setSortBy({
        parametr: 'popularity',
        type: 'acs',
        func: handlePopularitySort,
      });
      return sortedBouquetsListDesc;
    } else if (sortBy.parametr === 'popularity' && sortBy.type === 'acs') {
      setSortBy({
        parametr: 'popularity',
        type: 'desc',
        func: handlePopularitySort,
      });
      return sortedBouquetsListDesc;
    } else {
      setSortBy({
        parametr: 'popularity',
        type: 'acs',
        func: handlePopularitySort,
      });
      return sortedBouquetsList;
    }
  }

  return (
    <>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <BouquetSort
        activeSorting={sortBy.parametr}
        sorting={{
          price: () => setBouquetsList([...handlePriceSort(bouquetsList)]),
          novelty: () => setBouquetsList([...handleNoveltySort(bouquetsList)]),
          popularity: () =>
            setBouquetsList([...handlePopularitySort(bouquetsList)]),
        }}
      />
      <PriceFilter value={value} changeFunc={handleChangePrice}></PriceFilter>
      <Box sx={{ width: '100%', px: { xs: '3%', lg: '9.4%' }, my: size(30) }}>
        <Box
          sx={{ width: '100%', mx: 'auto' }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr 1fr',
                md: '1fr 1fr 1fr',
                lg: '1fr 1fr 1fr 1fr',
              },
              columnGap: size(10),
              rowGap: {...size(60),xs:40},
            }}
          >
            {category ? (
              bouquetsList?.map(
                ({ _id, title, images, price, slug }, index) => (
                  <Box key={`${_id}-${index}`}>
                    <BouquetCard
                      id={_id}
                      title={title.ru}
                      imagePath={images[0]}
                      slug={slug}
                      categorySlug={`catalog/${category?.slug?.current}`}
                      price={price}
                      deliveryPrice={generalInfo?.deliveryPrice}
                      deliveryMin={generalInfo?.deliveryMin}
                    ></BouquetCard>
                  </Box>
                )
              )
            ) : (
              <>Букеты с этой категорией не найдены</>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BouquetListPage;
