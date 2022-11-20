import React from 'react';
import style from '../styles/pages/AboutUs.module.css';
import { useState, useEffect } from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import Typography from '@mui/material/Typography';
import BlockContent from '@sanity/block-content-to-react';
import { useDevicePixelRatio } from 'use-device-pixel-ratio';
import { getDevicePixelRatio } from '../node_modules/use-device-pixel-ratio/dist/index';

export default function AboutUs({ instagramPosts, pageData }) {
  const [mappedPageData, setMappedPageData] = useState(pageData);
  const dpr = useDevicePixelRatio();
  // console.log('dpr',dpr);
  console.log('Device pixel ratio is ', getDevicePixelRatio());

  // useEffect(() => {
  //   if (pageData?.length) {
  //     const imgBuilder = imageUrlBuilder({
  //       projectId: '444cz5oj',
  //       dataset: 'production',
  //     });

  //     setMappedPageData(
  //       pageData.map((p) => {
  //         return {
  //           ...p,
  //           mainImage: imgBuilder.image(p.mainImage).width(720).height(900),
  //           secondImage: imgBuilder.image(p.mainImage).width(720).height(900),
  //         };
  //       })
  //     );
  //   } else {
  //     setMappedPageData([]);
  //   }
  // }, [pageData]);

  return (
    <>
      <IntroBlock
        mainImage={pageData[0].mainImage}
        secondImage={pageData[0].secondImage}
        textBlock={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: 'max(40px,2.1vw)',
            }}
          >
            <Typography
              variant='h1'
              component='h1'
              color='initial'
              sx={{
                fontSize: { md: '40px', lg: '65px', xxl: '3.4vw' },
                position: 'relative',
                left: '-10%',
              }}
            >
              {pageData[0].title.ru}
            </Typography>
            <Box
              sx={{
                '& p': {
                  fontFamily: 'Raleway, serif',
                  fontSize: { md: '16px', xl: '20px', xxl: '1vw' },
                  '@media (-webkit-min-device-pixel-ratio: 1.25)': {
                    fontSize: { md: '16px', xxl: '1vw' },
                  },
                },
                my: 'auto',
              }}
              component={BlockContent}
              blocks={pageData[0].text.ru}
            ></Box>
            <Box
              sx={{
                '& span': {
                  fontFamily: 'Zeferino One, serif',
                  fontSize: { md: '36px', xl: '50px', xxl: '2.6vw' },
                  lineHeight:'1',
                },
                '& p': {
                  m: '0',
                },
              }}
            >
              <Box
                component='p'
                sx={{ textAlign: 'left', position: 'relative', left: '-10%' }}
              >
                <span className={style.decorText}>Ваши</span> самые необычные и
                оригинальные <span>замыслы</span>
              </Box>
              <Box component='p' sx={{ textAlign: 'center' }}>
                становятся <span> реальностью </span> помощью наших опытных
              </Box>
              <Box component='p' sx={{ textAlign: 'right' }}>
                <span> флористов. </span>
              </Box>
            </Box>
          </Box>
        }
      ></IntroBlock>
      <Box component='section' sx={{ my: 'max(100px,5vw)', px: '10%' }}>
        <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
      </Box>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "aboutusPage"]
  {
    _id,
    title,
    text,
    mainImage,
    secondImage,

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
