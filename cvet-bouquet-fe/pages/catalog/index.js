import React, { useEffect } from 'react';
import styles from '../../styles/Catalog.module.css';
import imageUrlBuilder from '@sanity/image-url';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import InstagramBlock from '../../src/components/InstagramBlock/InstagramBlock';
import { sanityClient } from '../../sanity';
import SimpleBouquetCard from '../../src/components/SimpleBouquetCard/SimpleBouquetCard';
import BreadCrumbs from '../../src/components/breadcrubs/BreadCrumbs';

export default function Home({ category, instagramPosts }) {
  const [mappedBouquets, setMappedBouquets] = React.useState(category);
  const breadCrumbsList = [
    { title: 'Главаная', href: '/' },
    { title: 'Каталог', href: null },
  ];

  const orderedList = mappedBouquets?.sort((a, b) => a.order - b.order);

  return (
    <>
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
                sm: '1fr 1fr',
                lg: '1fr 1fr 1fr',
                xl: '1fr 1fr 1fr 1fr',
              },
              columnGap: {xs:'4px',lg:'max(30px, 1.5vw)'},
              rowGap: 'max(30px, 1.5vw)',
            }}
          >
            {mappedBouquets.length ? (
              orderedList.map(
                (
                  { _id, title, description, mainImage, price, slug },
                  index
                ) => (
                  <SimpleBouquetCard
                    id={_id}
                    title={title}
                    imagePath={mainImage}
                    slug={slug}
                    price={null}
                  ></SimpleBouquetCard>
                )
              )
            ) : (
              <>Букеты не доступны</>
            )}
          </Box>
        </Box>
        <Box sx={{ my: 'max(100px,5vw)' }}>
          <InstagramBlock instagramPosts={instagramPosts} />
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

  const resultCategory = await sanityClient.fetch(queryCategory);

  const instagramUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`;
  const data = await fetch(instagramUrl);
  const instagramPosts = await data.json();

  if (!instagramPosts.data || !instagramPosts.data.length) {
    return {
      props: {
        bouquets: [],
      },
    };
  } else {
    return {
      props: {
        instagramPosts,
        category: resultCategory,
      },
    };
  }
};
