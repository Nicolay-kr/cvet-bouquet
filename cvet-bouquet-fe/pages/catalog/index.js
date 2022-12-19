import React from 'react';
import styles from '../../styles/Catalog.module.css';
import Box from '@mui/material/Box';
import { sanityClient } from '../../sanity';
import SimpleBouquetCard from '../../src/components/SimpleBouquetCard/SimpleBouquetCard';
import BreadCrumbs from '../../src/components/breadcrubs/BreadCrumbs';
import Head from 'next/head';

export default function Home({ data }) {
  const [mappedBouquets, setMappedBouquets] = React.useState(data);
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Каталог', href: null },
  ];

  const orderedList = mappedBouquets?.sort((a, b) => a.order - b.order);

  return (
    <>
      <Head lang='ru'>
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
            {mappedBouquets.length ? (
              orderedList.map(
                (
                  { _id, title, description, mainImage, price, slug },
                  index
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
              <>Букеты не доступны</>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const queryCategory = `*[ _type == "category"]
  {
    _id,
    slug,
    title,
    mainImage,
    bouqets[]->{
      _id,
      title,
      slug,
      images,
      price,
      description,
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
