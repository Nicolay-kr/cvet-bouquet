import styles from '../styles/Catalog.module.css';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BouquetCard from '../../src/components/BouquetCard';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function Home({ bouquets }) {
  const router = useRouter();
  const [mappedBouquets, setMappedBouquets] = useState([]);

  useEffect(() => {
    if (bouquets.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: '444cz5oj',
        dataset: 'production',
      });

      setMappedBouquets(
        bouquets.map((p) => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          };
        })
      );
    } else {
      setMappedBouquets([]);
    }
  }, [bouquets]);

  return (
    <Box
      pl={{ xs: 2, lg: 24 }}
      pr={{ xs: 2, lg: 24 }}
      component='main'
    >
      <Box sx={{ width: '100%' }} className={styles.cardsContainer}>
        <Grid
          container
          rowSpacing={20}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {mappedBouquets.length ? (
            mappedBouquets.map(
              ({ title, description, mainImage, price, slug }, index) => (
                <Grid xs={6} md={3}>
                  <BouquetCard
                    title={title.ru}
                    price={price}
                    // description={description.ru}
                    imagePath={mainImage}
                    slug={slug}
                  ></BouquetCard>
                </Grid>
              )
            )
          ) : (
            <>No Posts Yet</>
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

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[ _type == "bouquet" ]');
  const url = `https://444cz5oj.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        bouquets: [],
      },
    };
  } else {
    console.log(result.result);
    return {
      props: {
        bouquets: result.result,
      },
    };
  }
};
