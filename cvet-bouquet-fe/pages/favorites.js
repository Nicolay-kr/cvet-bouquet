import React from 'react';
import styles from '../styles/Catalog.module.css';
import BouquetCard from '../src/components/BouquetCard/BouquetCard';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { useAppContext } from '../src/components/context/BouquetsContext';
import { Typography } from '../node_modules/@mui/material/index';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';

export default function Favorites() {
  const [checked, setChecked] = React.useState(false);
  const bouquetsContext = useAppContext();
  const bouquets = bouquetsContext.favoriteBouquets;

  return (
    <>
      <Box sx={{ width: '100%', px: '10%', my: 3 }}>
        <Box
          sx={{ width: '100%', mx: 'auto' }}
          className={styles.cardsContainer}
        >
          <Grid
            container
            rowSpacing={10}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {bouquets.length ? (
              bouquets.map(
                ({ id, title, description, imagePath, price, slug }, index) => (
                  <Grid xs={12} sm={6} md={4} xl={3} key={index}>
                    <BouquetCard
                      id={id}
                      title={title}
                      price={price}
                      // description={description.ru}
                      imagePath={imagePath}
                      slug={slug}
                    ></BouquetCard>
                  </Grid>
                )
              )
            ) : (
              <>
                <Typography variant='h4' component='h2' mt={4}>
                  Здесь хранятся понравившиеся вам букеты
                </Typography>
                <Box sx={{ height: '50vh', width: '100%' }}></Box>
              </>
            )}
          </Grid>
        </Box>
      </Box>
      {/* <Box sx={{ mt: 'max(150px,7vw)', mb: 'max(150px,7vw)' }}>
        <InstagramBlock></InstagramBlock>
      </Box> */}
    </>
  );
}
