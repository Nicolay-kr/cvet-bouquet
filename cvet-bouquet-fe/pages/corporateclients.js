import React from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import TitleWithTextBlock from '../src/components/titleWithTextBlock/TitleWithTextBlock';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';
import Typography from '@mui/material/Typography';
import AccordionCustom from '../src/components/AccordionCustom/AccordionCustom';

export default function CorporateClientsPage({ instagramPosts, pageData }) {
  const breadCrumbsList = [
    { title: 'Главаная', href: '/' },
    { title: `${pageData[0].title.ru}`, href: null },
  ];

  return (
    <>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <IntroBlock
        mainImage={pageData[0].mainImage}
        secondImage={pageData[0].secondImage}
        isSecondFlower={true}
        isSecondFlowerMobile={true}
        textBlock={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: { xs: '0', lg: 'max(40px,2.1vw)' },
              mb: { xs: '40px', lg: '0' },
            }}
          >
            <TitleWithTextBlock
              title={pageData[0].title.ru}
              blocks={pageData[0].text.ru}
            ></TitleWithTextBlock>

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
                  fieldList={pageData[0].advantages}
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
          <AccordionCustom fieldList={pageData[0].advantages}></AccordionCustom>
        </Box>
      </Box>

      <Box
        component='section'
        sx={{ my: 'max(100px,5vw)', px: { xs: '5%', lg: '10%' } }}
      >
        <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
      </Box>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "corporateclientsPage"]
  {
    _id,
    title,
    text,
    mainImage,
    secondImage,
    advantages,
  }`;

  const pageData = await sanityClient.fetch(query);

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
        pageData: pageData,
      },
    };
  }
};
