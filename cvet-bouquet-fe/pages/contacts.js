import React from 'react';
// import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import ShopsList from '../src/components/ShopsList';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import PhoneIcon from '../public/assets/icons/phoneBlack.svg';
import InstaIcon from '../public/assets/icons/insta.svg';
import Typography from '@mui/material/Typography';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Head from 'next/head';
import size from '../src/utils/size';

export default function Contacts({ instagramPosts, pageData, generalInfo }) {
  const defaultState = {
    center: [53.893009, 27.567444],
    zoom: 12,
  };

  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: pageData[0].title.ru, href: null },
  ];

  return (
    <>
     <Head lang='ru'>
        <title> {pageData[0].title.ru} | ЦВЕТ•БУКЕТ</title>
      </Head>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <Box
        sx={{
          display: 'grid',
          columnGap: 'max(30px,1.5vw)',
          rowGap: 'max(30px,1.5vw)',
          mb: 'max(40px,1.7vw)',
          mx: { xs: '5%', lg: '10%' },
          gridTemplateColumns: { xs: '1fr', lg: '6fr 5fr' },
        }}
      >
        <Box sx={{ width: '100%', height: { xs: '100vw', lg: 'auto' } }}>
          <YMaps>
            <Map defaultState={defaultState} width='100%' height='100%'>
              <Placemark
                geometry={[53.911747, 27.540074]}
                options={{
                  iconColor: '#746449',
                }}
              />
              <Placemark
                geometry={[53.928699, 27.631585]}
                options={{
                  iconColor: '#746449',
                }}
              />
            </Map>
          </YMaps>
        </Box>

        <Box>
          <Box>
            <Typography
              variant='h4'
              component='p'
              color='#000000'
              sx={{ fontWeight: '700', mb: '20px' }}
            >
              Позвоните нам
            </Typography>
            <Typography
              variant='h5'
              component='p'
              sx={{ textDecoration: 'none', mb: '20px' }}
            >
              Мы с удовольствием обсудим с Вами все детали заказа, ответим на
              все волнующие вопросы.
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <PhoneIcon/>
              <Typography
                variant='h5'
                component='a'
                sx={{ textDecoration: 'underline', ml: '10px',cursor:'pointer' }}
                href={`tel:${generalInfo.phone.replace(/-|\s/gi,'')}`}
              >
                {generalInfo.phone}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: '64px' }}>
            <Typography
              variant='h4'
              component='p'
              color='#000000'
              sx={{ fontWeight: '700', mb: '20px' }}
            >
              Приходите к нам в гости
            </Typography>
            <Typography variant='h5' component='p' sx={{ mb: '20px' }}>
              Праздник души начинается уже с порога наших студий. Именно здесь
              мы упаковываем самые важные смыслы в букеты и цветочные
              композиции.
            </Typography>

            {generalInfo.shopsList.map((shop) => (
              <Box key={shop._key}>
                {shop.published ? (
                  <ShopsList shop={shop}></ShopsList>
                ) : null}
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: '64px' }}>
            <Typography
              variant='h4'
              component='p'
              color='#000000'
              sx={{ fontWeight: '700', mb: '20px' }}
            >
              Попишитесь на наш инстаграм
            </Typography>
            <Typography
              variant='h5'
              component='p'
              sx={{ textDecoration: 'none', mb: '20px' }}
            >
              Здесь о бесконечной любви к цветам и атмосфере счастья каждый
              день. Разделите с нами эти чувства!
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <InstaIcon/>
              <Typography
                variant='h5'
                component='a'
                href={`https://www.instagram.com/${generalInfo.instagram.slice(1)}`}
                target='_component'
                sx={{ textDecoration: 'underline', ml: '10px',cursor:'pointer' }}
              >
                {generalInfo.instagram}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ my: size(300), px: { xs: '5%', lg: '10%' } }}>
        <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
      </Box>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "contactsPage"]
  {
    _id,
    title,
    text,
  }`;

  const generalInfoQuery = `*[ _type == "generalInfo"]
  {
    _id,
    phone,
    email,
    instagram,
    worktime,
    shopsList[],
  }`;

  const pageData = await sanityClient.fetch(query);
  const generalInfo = await sanityClient.fetch(generalInfoQuery);

  const instagramUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`;
  const data = await fetch(instagramUrl);
  const instagramPosts = await data.json();

  if (!pageData.length || !generalInfo.length) {
    return {
      props: {
        pageData: [],
      },
    };
  } else {
    return {
      props: {
        pageData,
        generalInfo: generalInfo[0],
        instagramPosts,
      },
    };
  }
};
