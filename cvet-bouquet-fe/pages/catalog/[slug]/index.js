import React from 'react';
import { sanityClient } from '../../../sanity';
import BouquetListPage from '../../../src/components/BouquetListPage';
import BreadCrumbs from '../../../src/components/breadcrubs/BreadCrumbs';
import CaruselBlockWithArch from '../../../src/components/CaruselBlockWithArch/CaruselBlockWithArch';
import InstagramBlock from '../../../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextsQuote from '../../../src/components/TextsQuote';
import Head from 'next/head';
import size from '../../../src/utils/size';
// import { useState } from 'react';

export const CategoryBouquets = ({ data, instagramPosts }) => {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Каталог', href: '/catalog' },
    { title: data?.category?.title, href: null },
  ];
  
  const isPremium = data?.category?.slug.current === 'premium-floristika';

  return isPremium ? (
    <>
      <Head lang='ru'>
        <title>{data?.category?.title} | ЦВЕТ•БУКЕТ</title>
      </Head>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <Box
        sx={{ display: { xs: 'block', lg: 'none' }, width: '100%', px: '5%' }}
      >
        <TextsQuote></TextsQuote>
      </Box>
      <CaruselBlockWithArch
        bouquets={data?.category?.bouqets}
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

      <Box sx={{ my: size(300), px: { xs: '5%', lg: '10%' } }}>
        <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
      </Box>
    </>
  ) : (
    <>
       <Head lang='ru'>
        <title>{data?.category?.title} | ЦВЕТ•БУКЕТ</title>
      </Head>
      <BouquetListPage
      breadCrumbsList={breadCrumbsList}
      instagramPosts={instagramPosts}
      category={data?.category}
      generalInfo={data?.generalInfo}
    ></BouquetListPage>
    </>

  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  const query = `{
    "category":*[ _type == "category" && slug.current == "${pageSlug}"][0]{
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
        "delivery":*[_type == "generalInfo"][0]{deliveryPrice,deliveryMin},
        publishedAt,
      },
    },
    "generalInfo":*[ _type == "generalInfo"][0]{
      _id,
      deliveryPrice,
      deliveryMin,
      }
  }`;

  const data = await sanityClient.fetch(query);

  const instagramUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`;
  const dataInst = await fetch(instagramUrl);
  const instagramPosts = await dataInst.json();

  if (!data) {
    return {
      props: {
        data: {},
      },
    };
  } else {
    return {
      props: {
        instagramPosts,
        data,
      },
    };
  }
};
export default CategoryBouquets;
