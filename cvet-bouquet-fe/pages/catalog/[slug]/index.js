import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import styles from '../../../styles/BouquetPage.module.css';
import BlockContent from '@sanity/block-content-to-react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CounterButtons from '../../../src/components/CounterButtons/CounterButtons';
import butttonHeart from '../../../public/assets/icons/buttonHeart.svg';
import butttonHeartFill from '../../../public/assets/icons/buttonHeartFill.svg';
import Image from 'next/future/image';
import AccordionCustom from '../../../src/components/AccordionCustom/AccordionCustom';
import AddToCartButton from '../../../src/components/AddToCartButton/AddToCartButton';
import { useAppContext } from '../../../src/components/context/BouquetsContext';
import InstagramBlock from '../../../src/components/InstagramBlock/InstagramBlock';
import { sanityClient } from '../../../sanity';
import BouquetCard from '../../../src/components/BouquetCard/BouquetCard';
import Grid from '@mui/material/Unstable_Grid2';

export const CategoryBouquets = ({ category, instagramPosts }) => {


  return (
    <Box sx={{ width: '100%', px: '10%', my: 3 }}>
      <Box sx={{ width: '100%', mx: 'auto' }} className={styles.cardsContainer}>
        <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {category.length ? (
            category[0]?.bouqets?.map(
              ({ _id, title, description, images, price, slug }, index) => (
                <Grid xs={12} sm={6} md={4} xl={3} key={_id}>
                  <BouquetCard
                    id={_id}
                    title={title.ru}
                    imagePath={images[0]}
                    slug={slug}
                    categorySlug={category[0].slug.current}
                    price={price}
                  ></BouquetCard>
                </Grid>
              )
            )
          ) : (
            <>No Bouqets Yet</>
          )}
        </Grid>
      </Box>
        <Box sx={{my:'max(100px,5vw)'}}>
        <InstagramBlock instagramPosts={instagramPosts} />

        </Box>
    </Box>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  const queryCategory = `*[ _type == "category" && slug.current == "${pageSlug}"]
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
export default CategoryBouquets;
