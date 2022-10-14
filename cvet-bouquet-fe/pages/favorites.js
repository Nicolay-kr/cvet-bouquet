import React from 'react';
import styles from '../styles/Catalog.module.css';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BouquetCard from '../src/components/BouquetCard';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useAppContext } from '../src/components/context/HeartContext';

export default function Favorites() {
  // const router = useRouter();
  const bouquetsContext = useAppContext()
  const bouquets = bouquetsContext.bouquetList;
  // const [mappedBouquets, setMappedBouquets] = useState([]);

  // useEffect(() => {
  //   if (bouquets.length) {
  //     const imgBuilder = imageUrlBuilder({
  //       projectId: '444cz5oj',
  //       dataset: 'production',
  //     });

  //     setMappedBouquets(
  //       bouquets.map((p) => {
  //         return {
  //           ...p,
  //           mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
  //         };
  //       })
  //     );
  //   } else {
  //     setMappedBouquets([]);
  //   }
  // }, [bouquets]);

  return (
    <Box sx={{ width: '100%', px: '10%', my: 3 }}>
      <Box sx={{ width: '100%', mx: 'auto' }} className={styles.cardsContainer}>
        <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
            <>No Bouquet Yet</>
          )}
        </Grid>
      </Box>
      {/* <div className={styles.feed}>
          {mappedBouquets.length ? (
            mappedBouquets.map(({ title, description, mainImage }, index) => (
              <BouquetCard
                title={title.ru}
                // description={description.ru}
                imagePath={mainImage}
              ></BouquetCard>
            ))
          ) : (
            <>No Posts Yet</>
          )}
        </div> */}
    </Box>
  );
}

