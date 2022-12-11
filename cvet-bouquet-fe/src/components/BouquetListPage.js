import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InstagramBlock from './InstagramBlock/InstagramBlock';
import BouquetCard from './BouquetCard/BouquetCard';
import BreadCrumbs from './breadcrubs/BreadCrumbs';
import BouquetSort from './BouquetSort/BouquetSort';
import PriceFilter from './PriceFilter';
import size from '../utils/size';
import { useRouter } from 'next/router';

const BouquetListPage = ({
  category,
  instagramPosts,
  breadCrumbsList,
  generalInfo,
}) => {
  const defaultBouquetsList = category.length && category[0]?.bouqets;
  const [bouquetsList, setBouquetsList] = React.useState(defaultBouquetsList);
  const router = useRouter();
  const [value, setValue] = React.useState(
    router.query.price ? router.query.price : 'all'
  );
  const handleChangePrice = (value) => {
    setValue(value);
    router.push(
      {
        pathname: router.pathname,
        query: !(value === 'all')
          ? { price: `${value}`, slug: router.query.slug }
          : { slug: router.query.slug },
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
      setBouquetsList([...defaultBouquetsList]);
    } else {
      const sortedBouquetsList = defaultBouquetsList.filter(
        (bouquet) =>
          arrValue[0] <= +bouquet.price && +bouquet.price <= +arrValue[1]
      );
      setBouquetsList([...sortedBouquetsList]);
    }
  };

  const [sorting, setSorting] = React.useState({
    price: { type: 'none', func: handlePriceSort },
    novelty: { type: 'none', func: handleNoveltySort },
    popularity: { type: 'none', func: handlePopularitySort },
  });

  useEffect(() => {
    setBouquetsList([...defaultBouquetsList]);
  }, [defaultBouquetsList]);

  useEffect(() => {
    handleChangePrice(value);
  }, []);

  const [activeSorting, setActiveSorting] = React.useState('popularity');

  function handlePriceSort() {
    const sortedBouquetsList = bouquetsList.sort((a, b) => a.price - b.price);
    const sortedBouquetsListDesc = [...sortedBouquetsList].reverse();
    if (sorting.price.type === 'none' || sorting.price.type === 'desc') {
      setBouquetsList([...sortedBouquetsList]);
      setSorting((state) => ({
        ...state,
        price: { func: handlePriceSort, type: 'asc' },
      }));
    } else if (sorting.price.type === 'asc') {
      setBouquetsList([...sortedBouquetsListDesc]);
      setSorting((state) => ({
        ...state,
        price: { func: handlePriceSort, type: 'desc' },
      }));
    }
    setActiveSorting('price');
  }

  function handleNoveltySort() {
    const sortedBouquetsList = bouquetsList.sort(
      (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
    );
    const sortedBouquetsListDesc = [...sortedBouquetsList].reverse();
    if (sorting.novelty.type === 'none' || sorting.novelty.type === 'desc') {
      setBouquetsList([...sortedBouquetsList]);
      setSorting((state) => ({
        ...state,
        novelty: { func: handleNoveltySort, type: 'asc' },
      }));
    } else if (sorting.novelty.type === 'asc') {
      setBouquetsList([...sortedBouquetsListDesc]);
      setSorting((state) => ({
        ...state,
        novelty: { func: handleNoveltySort, type: 'desc' },
      }));
    }
    setActiveSorting('novelty');
  }

  function handlePopularitySort() {
    const sortedBouquetsList = defaultBouquetsList;
    const sortedBouquetsListDesc = [...sortedBouquetsList].reverse();
    if (
      sorting.popularity.type === 'none' ||
      sorting.popularity.type === 'desc'
    ) {
      setBouquetsList([...sortedBouquetsList]);
      setSorting((state) => ({
        ...state,
        popularity: { func: handlePopularitySort, type: 'asc' },
      }));
    } else if (sorting.popularity.type === 'asc') {
      setBouquetsList([...sortedBouquetsListDesc]);
      setSorting((state) => ({
        ...state,
        popularity: { func: handlePopularitySort, type: 'desc' },
      }));
    }
    setActiveSorting('popularity');
  }

  return (
    <>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <BouquetSort
        activeSorting={activeSorting}
        sorting={{
          price: handlePriceSort,
          novelty: handleNoveltySort,
          popularity: handlePopularitySort,
        }}
      />
      <PriceFilter value={value} changeFunc={handleChangePrice}></PriceFilter>
      <Box sx={{ width: '100%', px: { xs: '5%', lg: '10%' }, my: 3 }}>
        <Box
          sx={{ width: '100%', mx: 'auto' }}
          // className={styles.cardsContainer}
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
              rowGap: size(60),
            }}
          >
            {category.length ? (
              bouquetsList?.map(
                ({ _id, title, images, price, slug }, index) => (
                  <Box key={`${_id}-${index}`}>
                    <BouquetCard
                      id={_id}
                      title={title.ru}
                      imagePath={images[0]}
                      slug={slug}
                      categorySlug={`catalog/${category[0].slug.current}`}
                      price={price}
                      deliveryPrice={generalInfo.deliveryPrice}
                      deliveryMin={generalInfo.deliveryMin}
                    ></BouquetCard>
                  </Box>
                )
              )
            ) : (
              <>No Bouqets Yet</>
            )}
          </Box>
        </Box>
        <Box sx={{ my: 'max(100px,5vw)' }}>
          <InstagramBlock instagramPosts={instagramPosts} />
        </Box>
      </Box>
    </>
  );
};

export default BouquetListPage;
