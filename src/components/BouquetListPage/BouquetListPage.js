import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import BouquetCard from '../BouquetCard/BouquetCard';
import BreadCrumbs from '../breadcrubs/BreadCrumbs';
import BouquetSort from '../BouquetSort/BouquetSort';
import PriceFilter from '../PriceFilter/PriceFilter';
import size from '../../utils/size';
import { useRouter } from 'next/router';
import sortArray from 'sort-array';

const BouquetListPage = ({ category, breadCrumbsList, generalInfo, bouqets }) => {
  const defaultBouquetsList = bouqets.filter(item=>item.published===true);
  const [bouquetsList, setBouquetsList] = React.useState(defaultBouquetsList);
  const [filtredBouquetsList, setFilterdBouquetsList] = React.useState([]);
  const router = useRouter();

  const [value, setValue] = React.useState(
    router.query.price ? router.query.price : 'all'
  );

  const [sortBy, setSortBy] = React.useState({
    by: 'popularity',
    order: 'desc',
  });

  const handleChangePrice = (value,isDesc=false) => {
    setValue(value);
 

    let arrValue = [];
    let filtredBouquetsList = [];

    if (value === 'primary') {
      arrValue = [1001, 10000];
      filtredBouquetsList = defaultBouquetsList.filter(
        (bouquet) =>
          arrValue[0] <= +bouquet.price && +bouquet.price <= +arrValue[1]
      );
    } else if (value === 'all') {
      filtredBouquetsList = defaultBouquetsList;
    } else {
      arrValue = value.split('-');
      filtredBouquetsList = defaultBouquetsList.filter(
        (bouquet) =>
          arrValue[0] <= +bouquet.price && +bouquet.price <= +arrValue[1]
      );
    }
    setBouquetsList([...filtredBouquetsList]);
    setFilterdBouquetsList([...filtredBouquetsList]);
  };

  useEffect(() => {
    let newbouquetsList = [...bouquetsList];
    let sortedBouquetsList = sortArray(newbouquetsList, sortBy)
    setBouquetsList([...sortedBouquetsList]);
  },[sortBy])

  useEffect(() => {
    handleChangePrice(value);
  }, [bouqets]);
  useEffect(() => {
    router.push(
      {
        pathname: router.pathname,
        query: !(value === 'all')
          ? { price: `${value}`, slug: router.query.slug }
          : router.query.slug
          ? { slug: router.query.slug }
          : null,
      },
      undefined,
      { shallow: false }
    );
  }, [value]);

  function handlePriceSort() {
    if (sortBy.by === 'price' && sortBy.order === 'asc') {
      setSortBy({
        by: 'price',
        order: 'desc',
      });
    } else {
      setSortBy({
        by: 'price',
        order: 'asc',
      });
    }
  }

  function handleNoveltySort() {
    if (sortBy.by === 'publishedAt' && sortBy.order === 'asc') {
      setSortBy({
        by: 'publishedAt',
        order: 'desc',
      });
    } else {
      setSortBy({
        by: 'publishedAt',
        order: 'asc',
      });
    }
  }

  function handlePopularitySort() {
    if (sortBy.by === 'popularity' && sortBy.order === 'asc') {
      setSortBy({
        by: 'popularity',
        order: 'desc',
      });
      setBouquetsList([...filtredBouquetsList]);
      
    } else {
      setSortBy({
        by: 'popularity',
        order: 'asc',
      });
      let reverseList = [...filtredBouquetsList];
      setBouquetsList([...reverseList.reverse()]);
      

    }
  }

  return (
    <>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <BouquetSort
        activeSorting={sortBy}
        sorting={{
          price: () => handlePriceSort(),
          novelty: () => handleNoveltySort(),
          popularity: () => handlePopularitySort(),
        }}
      />
      <PriceFilter value={value} changeFunc={handleChangePrice}></PriceFilter>
      <Box sx={{ width: '100%', px: { xs: '3%', lg: '9.4%' }, my: size(30) }}>
        <Box sx={{ width: '100%', mx: 'auto' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr 1fr',
                md: '1fr 1fr 1fr',
                lg: '1fr 1fr 1fr 1fr',
              },
              columnGap: size(10),
              rowGap: { ...size(60), xs: 40 },
            }}
          >
            {category ? (
              bouquetsList?.map(
                ({ _id, title, images, price, slug }, index) => (
                  <Box key={`${_id}-${index}`}>
                    <BouquetCard
                      id={_id}
                      title={title?.ru}
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
