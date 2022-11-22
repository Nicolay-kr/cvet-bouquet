import React from 'react';
import styles from '../../styles/Catalog.module.css';
// import BouquetCard from '../../../src/components/BouquetCard/BouquetCard';
import BouquetCard from '../../src/components/BouquetCard/BouquetCard';
import Box from '@mui/material/Box';
import { useAppContext } from '../../src/components/context/BouquetsContext';
import Typography from '@mui/material/Typography';
import BreadCrumbs from '../../src/components/breadcrubs/BreadCrumbs';

export default function Favorites() {
  const [checked, setChecked] = React.useState(false);
  const bouquetsContext = useAppContext();
  const bouquets = bouquetsContext.favoriteBouquets;
  const breadCrumbsList = [
    { title: 'Главаная', href: '/' },
    { title: 'Избранное', href: null },
  ];

  return (
    <>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <Box sx={{ width: '100%', px: '10%', my: 3 }}>
        <Box
          sx={{ width: '100%', mx: 'auto', my: '60px' }}
          className={styles.cardsContainer}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                lg: '1fr 1fr 1fr',
                xl: '1fr 1fr 1fr 1fr',
              },
              columnGap: 'max(30px, 1.5vw)',
              rowGap: 'max(30px, 1.5vw)',
            }}
          >
            {bouquets.length ? (
              bouquets.map(
                ({ id, title, description, imagePath, price, slug }, index) => (
                  <BouquetCard
                    id={id}
                    title={title}
                    price={price}
                    // description={description.ru}
                    categorySlug={'favorites/'}
                    categoryName={'Избранное'}
                    imagePath={imagePath}
                    slug={slug}
                  ></BouquetCard>
                )
              )
            ) : (
              <>
                <Typography
                  variant='h4'
                  component='h2'
                  mt={4}
                  sx={{ gridColumn: '1/4' }}
                >
                  Здесь хранятся понравившиеся вам букеты
                </Typography>
                <Box sx={{ height: '50vh', width: '100%' }}></Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
      {/* <Box sx={{ mt: 'max(150px,7vw)', mb: 'max(150px,7vw)' }}>
        <InstagramBlock></InstagramBlock>
      </Box> */}
    </>
  );
}
