import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InstagramBlock from './InstagramBlock/InstagramBlock';
import BouquetCard from './BouquetCard/BouquetCard';
import BreadCrumbs from './breadcrubs/BreadCrumbs';
import BouquetSort from './BouquetSort/BouquetSort';
import PriceFilter from './PriceFilter';

const BouquetListPage = ({ category, instagramPosts, breadCrumbsList }) => {
  const defaultBouquetsList = category.length && category[0]?.bouqets
  const [bouquetsList, setBouquetsList] = React.useState(defaultBouquetsList);
  const [value, setValue] = React.useState('Все');

  const handleChangePrice = (value) => {
    setValue(value);
    const arrValue = value.split(',');
    if(value==='Все'){
      setBouquetsList([...defaultBouquetsList])
    }else{
      const sortedBouquetsList = defaultBouquetsList.filter((bouquet)=>(arrValue[0]<=+bouquet.price && +bouquet.price <=+ arrValue[1]))
      setBouquetsList([...sortedBouquetsList])
    }

  };

  const [sorting, setSorting] = React.useState({
    price: { type: 'none', func: handlePriceSort },
    novelty: { type: 'none', func: handleNoveltySort },
    popularity: { type: 'none', func: handlePopularitySort },
  });

    useEffect(() => {
      setBouquetsList([...defaultBouquetsList])
  }, [defaultBouquetsList]);

  const [activeSorting, setActiveSorting] = React.useState('popularity');

  function handlePriceSort() {
    const sortedBouquetsList = bouquetsList.sort((a, b) => a.price - b.price);
    const sortedBouquetsListDesc = [...sortedBouquetsList].desctopReverse();
    if (sorting.price.type === 'none' || sorting.price.type === 'desc') {
      setBouquetsList([...sortedBouquetsList]);
      setSorting(state=>({...state, price: { func: handlePriceSort, type: 'asc' }}));
    } else if (sorting.price.type === 'asc') {
      setBouquetsList([...sortedBouquetsListDesc]);
      setSorting(state=>({...state, price: { func: handlePriceSort, type: 'desc' }}));
    }
    setActiveSorting('price')
  }

  function handleNoveltySort() {
    const sortedBouquetsList = bouquetsList.sort((a, b) => a.price - b.price);
    const sortedBouquetsListDesc = [...sortedBouquetsList].desctopReverse();
    if (sorting.novelty.type === 'none' || sorting.novelty.type === 'desc') {
      setBouquetsList([...sortedBouquetsList]);
      setSorting(state=>({...state, novelty: { func: handleNoveltySort, type: 'asc' }}));
    } else if (sorting.novelty.type === 'asc') {
      setBouquetsList([...sortedBouquetsListDesc]);
      setSorting(state=>({...state, novelty: { func: handleNoveltySort, type: 'desc' }}));
    }
    setActiveSorting('novelty')
  }

  function handlePopularitySort() {
    const sortedBouquetsList = defaultBouquetsList;
    const sortedBouquetsListDesc = [...sortedBouquetsList].desctopReverse();
    if (sorting.popularity.type === 'none' || sorting.popularity.type === 'desc') {
      setBouquetsList([...sortedBouquetsList]);
      setSorting(state=>({...state, popularity: { func: handlePopularitySort, type: 'asc' }}));
    } else if (sorting.popularity.type === 'asc') {
      setBouquetsList([...sortedBouquetsListDesc]);
      setSorting(state=>({...state, popularity: { func: handlePopularitySort, type: 'desc' }}));
    }
    setActiveSorting('popularity')
  }

  // console.log(value);

  return (
    <>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <BouquetSort activeSorting={activeSorting} sorting={{ price: handlePriceSort,novelty:handleNoveltySort,popularity:handlePopularitySort }} />
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
                sm: '1fr 1fr',
                lg: '1fr 1fr 1fr',
                xl: '1fr 1fr 1fr 1fr',
              },
              columnGap: { xs: '4px', lg: 'max(30px, 1.5vw)' },
              rowGap: 'max(30px, 1.5vw)',
            }}
          >
            {category.length ? (
              bouquetsList?.map(
                ({ _id, title, description, images, price, slug }, index) => (
                  <Box key={_id}>
                    <BouquetCard
                      id={_id}
                      title={title.ru}
                      imagePath={images[0]}
                      slug={slug}
                      categorySlug={`catalog/${category[0].slug.current}`}
                      price={price}
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
