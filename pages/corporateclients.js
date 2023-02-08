import React from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import TitleWithTextBlock from '../src/components/TitleWithTextBlock/TitleWithTextBlock';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';
import Typography from '@mui/material/Typography';
import AccordionCustom from '../src/components/AccordionCustom/AccordionCustom';
import Head from 'next/head';

export default function CorporateClientsPage({ data }) {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: `${data?.title?.ru}`, href: null },
  ];

  return (
    <>
    <Head>
        <title> {data?.title?.ru} | ЦВЕТ•БУКЕТ</title>
      </Head>
      <IntroBlock
        mainImage={data?.mainImage}
        secondImage={data?.secondImage}
        isSecondFlower={true}
        isSecondFlowerMobile={true}
        textBlock={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
             
              mb: { xs: '40px', lg: '0' },
            }}
          >
            <BreadCrumbs isInIntro={true} breadCrumbsList={breadCrumbsList}></BreadCrumbs>
            <Box sx={{ mt: { xs: '0', lg: 'max(40px,2.1vw)' },}}>
            <TitleWithTextBlock
              title={data?.title?.ru}
              blocks={data?.text?.ru}
            ></TitleWithTextBlock>

            </Box>
  

            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Typography
                variant='h1'
                component='h1'
                color='#000000'
                sx={{
                  fontSize: { xs: '40px', lg: '65px', xxl: '3.4vw' },
                  position: 'relative',
                  left: { xs: '0%', lg: '-3%' },
                  mt: { xs: '40px', lg: '80px' },
                }}
              >
                Наши преимущества
              </Typography>

              <Box sx={{ mt: { xs: '20px', lg: '20px' } }}>
                <AccordionCustom
                  fieldList={data?.advantages}
                ></AccordionCustom>
              </Box>
            </Box>
          </Box>
        }
      ></IntroBlock>

      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <Typography
          variant='h1'
          component='h1'
          color='#000000'
          sx={{
            fontSize: { xs: '40px', lg: '65px', xxl: '3.4vw' },
            position: 'relative',
            left: { xs: '0%', lg: '-3%' },
            mt: { xs: '40px', lg: '80px' },
          }}
        >
          Наши преимущества
        </Typography>

        <Box sx={{ mt: { xs: '20px', lg: '20px' },px: { xs: '5%', lg: '10%' } }}>
          <AccordionCustom fieldList={data?.advantages}></AccordionCustom>
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "corporateclientsPage"][0]
  {
    _id,
    title,
    text,
    mainImage,
    secondImage,
    advantages,
  }`;

  const data = await sanityClient.fetch(query);

  if (!data) {
    return {
      props: {
        data: {},
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
