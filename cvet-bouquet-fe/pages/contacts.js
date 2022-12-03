import React from 'react';
// import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import ShopsList from '../src/components/ShopsList';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import phoneIcon from '../public/assets/icons/phoneBlack.svg';
import instaIcon from '../public/assets/icons/insta.svg';
import Image from 'next/future/image';
import Typography from '@mui/material/Typography';
import FreePayForm from '../src/components/freeForm/FreePayForm';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';

export default function AboutUs({ instagramPosts, pageData }) {
  const shopsList = [
    {
      adress: 'г. Минск, пр. Победителей, 27, Славянский квартал',
      time: 'Время работы: пн-вс 9:00-21:00',
      metro: 'Немига',
    },
    {
      adress: 'г. Минск, пр. Независимости, 104',
      time: 'Время работы: пн-вс 9:00-21:00',
      metro: 'Московская',
    },
  ];

  const defaultState = {
    center: [53.893009, 27.567444],
    zoom: 12,
  };

  const breadCrumbsList = [
    { title: 'Главаная', href: '/' },
    { title: pageData[0].title.ru, href: null },
  ];

  return (
    <>
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
              componet='p'
              color='#000000'
              sx={{ fontWeight: '700', mb: '20px' }}
            >
              Позвоните нам
            </Typography>
            <Typography
              variant='h5'
              componet='p'
              sx={{ textDecoration: 'none', mb: '20px' }}
            >
              Мы с удовольствием обсудим с Вами все детали заказа, ответим на
              все волнующие вопросы.
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Image src={phoneIcon} color='black' alt='phone icon'></Image>
              <Typography
                variant='h5'
                componet='p'
                sx={{ textDecoration: 'underline', ml: '10px' }}
              >
                +375 44 556-55-55
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: '64px' }}>
            <Typography
              variant='h4'
              componet='p'
              color='#000000'
              sx={{ fontWeight: '700', mb: '20px' }}
            >
              Приходите к нам в гости
            </Typography>
            <Typography variant='h5' componet='p' sx={{ mb: '20px' }}>
              Праздник души начинается уже с порога наших студий. Именно здесь
              мы упаковываем самые важные смыслы в букеты и цветочные
              композиции.
            </Typography>

            {shopsList.map((shop, index) => (
              <Box key={shop.adress}>
                <ShopsList currentKey={index} shop={shop}></ShopsList>
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: '64px' }}>
            <Typography
              variant='h4'
              componet='p'
              color='#000000'
              sx={{ fontWeight: '700', mb: '20px' }}
            >
              Попишитесь на наш инстаграм
            </Typography>
            <Typography
              variant='h5'
              componet='p'
              sx={{ textDecoration: 'none', mb: '20px' }}
            >
              Здесь о бесконечной любви к цветам и атмосфере счастья каждый
              день. Разделите с нами эти чувства!
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Image src={instaIcon} alt='instagram icon'></Image>
              <Typography
                variant='h5'
                componet='p'
                sx={{ textDecoration: 'underline', ml: '10px' }}
              >
                cvetbuket.by
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: '40px' }}>
          <Typography
            variant='h4'
            componet='p'
            color='#000000'
            sx={{ fontWeight: '700', mb: '20px' }}
          >
            Реквизиты
          </Typography>
          <Typography variant='h5' componet='p' sx={{ mb: '20px' }}>
            Р/С: BY96 UNBS 3013 2107 5000 0000 0933 В БЕЛ. РУБ. В ЗАО «БСБ БАНК»
            ПР.ПОБЕДИТЕЛЕЙ, 23 КОРП. 4 Г.МИНСК БИК: UNBSBY2X УНП 193193419
          </Typography>
        </Box>
        <Box sx={{ mt: '0', gridColumn: { sx: '1/2', lg: '1/3' } }}>
          <FreePayForm isContactsForm={true}></FreePayForm>
        </Box>
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

  const pageData = await sanityClient.fetch(query);

  if (!pageData.length) {
    return {
      props: {
        pageData: [],
      },
    };
  } else {
    return {
      props: {
        pageData: pageData,
      },
    };
  }
};
