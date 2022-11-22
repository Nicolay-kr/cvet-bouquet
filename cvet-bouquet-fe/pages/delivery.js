import React from 'react';
import style from '../styles/pages/AboutUs.module.css';
import { useState, useEffect } from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import Typography from '@mui/material/Typography';
import TitleWithTextBlock from '../src/components/titleWithTextBlock/TitleWithTextBlock';
import DoubleBlock from '../src/components/doubleBlock/DoubleBlock';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/future/image';
import bigFlower from '../public/assets/images/bigFlower.svg';
import AccordionCustom from '../src/components/AccordionCustom/AccordionCustom';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';

export default function DeliveryPage({ pageData, instagramPosts }) {
  const lg = useMediaQuery('(min-width:1200px)');
  const breadCrumbsList = [
    { title: 'Главаная', href: '/' },
    { title: pageData[0].title.ru, href: null },
  ];
  return (
    <>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <DoubleBlock>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 'max(40px,2.1vw)',
          }}
        >
          <TitleWithTextBlock
            title={pageData[0].title.ru}
            blocks={pageData[0].text1.ru}
          ></TitleWithTextBlock>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: { xs: '0', lg: 'auto' },
            px: { xs: '0', lg: '10%' },
            '& li+li': {
              mt: '20px',
            },
          }}
        >
          {lg ? (
            <Image
              style={{
                position: 'absolute',
                top: '0',
                // right: '0',
                width: '30vw',
                height: '30vw',
                alignSelf: 'center',
                justifySelf: 'center',
              }}
              src={bigFlower}
              alt='flower'
            ></Image>
          ) : null}

          <TitleWithTextBlock
            title='Самовывоз из салона'
            blocks={pageData[0].text2.ru}
          ></TitleWithTextBlock>
        </Box>
      </DoubleBlock>
      <IntroBlock
        reverse={true}
        mainImage={pageData[0].mainImage}
        secondImage={pageData[0].secondImage}
        isDrop={true}
        textBlock={
          <Box sx={{ mt: { xs: '40px', lg: '35%' } }}>
            <AccordionCustom
              fieldList={pageData[0].conditions}
            ></AccordionCustom>
          </Box>
        }
      ></IntroBlock>

      {instagramPosts.data.length > 1 ? (
        <Box sx={{ my: 'max(100px,5vw)', px: '10%' }}>
          <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
        </Box>
      ) : null}
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "deliveryPage"]
  {
    _id,
    title,
    text1,
    text2,
    conditions,
    mainImage,
    secondImage,
 
  }`;

  const instagramUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`;
  const data = await fetch(instagramUrl);
  const instagramPosts = await data.json();

  const pageData = await sanityClient.fetch(query);

  return {
    props: {
      instagramPosts: !instagramPosts.data ? [] : instagramPosts,
      pageData: !pageData.length ? [] : pageData,
    },
  };
};
