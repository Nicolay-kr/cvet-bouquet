import React from 'react';
import styles from '../../styles/Catalog.module.css';
import Box from '@mui/material/Box';
import { sanityClient } from '../../sanity';
import SimpleBouquetCard from '../../src/components/SimpleBouquetCard/SimpleBouquetCard';
import BreadCrumbs from '../../src/components/breadcrubs/BreadCrumbs';
import Head from 'next/head';

export default function Home({ data }) {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Каталог', href: null },
  ];

  return (
    <>
      <Head>
        <title>Каталог | ЦВЕТ•БУКЕТ</title>
      </Head>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <Box sx={{ width: '100%', px: '10%', my: '40px' }}>
        <Box
          sx={{ width: '100%', mx: 'auto' }}
          className={styles.cardsContainer}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr 1fr',
                md: '1fr 1fr 1fr',
                lg: '1fr 1fr 1fr 1fr',
              },
              columnGap: { xs: '4px', lg: 'max(30px, 1.5vw)' },
              rowGap: 'max(30px, 1.5vw)',
            }}
          >
            {data?.categories?.length ? (
              data.categories.map(
                (
                  { _id, title, mainImage, slug },
                  
                ) => (
                  <Box key={_id}>
                    <SimpleBouquetCard
                      id={_id}
                      title={title}
                      imagePath={mainImage}
                      slug={slug}
                      price={null}
                    ></SimpleBouquetCard>
                  </Box>
                )
              )
            ) : (
              <>Категории не доступны</>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const queryCategory = `*[ _type == "categoryList"][0]{
    _id,
    categories[]->{
      _id,
      slug,
      title,
      mainImage,
      published,
      bouqets[]->{
        _id,
        title,
        slug,
        images,
        price,
        description,
      }
    },
  
}`;

  const data = await sanityClient.fetch(queryCategory);

  if (!data) {
    return {
      props: {
        data: [],
      },
    };
  } else {
    return {
      props: {
        data
      },
    };
  }
};
