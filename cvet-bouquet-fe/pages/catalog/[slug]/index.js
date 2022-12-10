import React from 'react';
import { sanityClient } from '../../../sanity';
import BouquetListPage from '../../../src/components/BouquetListPage';
import BreadCrumbs from '../../../src/components/breadcrubs/BreadCrumbs';
import CaruselBlockWithArch from '../../../src/components/CaruselBlockWithArch/CaruselBlockWithArch';
import InstagramBlock from '../../../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextsQuote from '../../../src/components/TextsQuote';
// import { useState } from 'react';

export const CategoryBouquets = ({ category, instagramPosts }) => {
  const breadCrumbsList = [
    { title: 'Главаная', href: '/' },
    { title: 'Каталог', href: '/catalog' },
    { title: category[0].title, href: null },
  ];
  
  const isPremium = category[0].slug.current === 'premium-floristika';
  console.log(category[0]);

  return isPremium ? (
    <>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <Box
        sx={{ display: { xs: 'block', lg: 'none' }, width: '100%', px: '5%' }}
      >
        <TextsQuote></TextsQuote>
      </Box>
      <CaruselBlockWithArch
        bouquets={category[0].bouqets}
        isPremium={isPremium}
        isSpec={true}
      ></CaruselBlockWithArch>
      <Box sx={{ px: { xs: '5%', lg: '10%' },mt: { xs: '20px'},textAlign: {xs:'center',md:'left'}, }}>
        <Typography variant='h4'>
          Почаще напоминайте о своих чувствах просто и без повода.
        </Typography>
        <Typography
          variant='h5'
          sx={{
            fontFamily: 'Zeferino One, serif',
            fontSize: { xs: '36px', xl: '50px', xxl: '2.6vw' },
            lineHeight: '1',
            textAlign: {xs:'center',md:'left'},
            position: 'relative',
            left: { xs: '0%', lg: '-3%' },
            mt: { xs: '10px', lg: '20px' },
          }}
        >
          Вместе с Цвет-Букет!{' '}
        </Typography>
      </Box>

      <Box sx={{ my: 'max(100px,5vw)', px: { xs: '5%', lg: '10%' } }}>
        <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
      </Box>
    </>
  ) : (
    <BouquetListPage
      breadCrumbsList={breadCrumbsList}
      instagramPosts={instagramPosts}
      category={category}
    ></BouquetListPage>
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
    data,
    bouqets[]->{
      _id,
      title,
      slug,
      images,
      price,
      description,
      care,
      delivery,
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
