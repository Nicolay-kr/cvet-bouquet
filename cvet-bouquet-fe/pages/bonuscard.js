import React from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import TitleWithTextBlock from '../src/components/titleWithTextBlock/TitleWithTextBlock';
import DoubleBlock from '../src/components/doubleBlock/DoubleBlock';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/future/image';
import bigFlower from '../public/assets/images/bigFlower.svg';
import AccordionCustom from '../src/components/AccordionCustom/AccordionCustom';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';

export default function BonusCardPage({ pageData, instagramPosts }) {
  const lg = useMediaQuery('(min-width:1200px)');
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
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
            title='Система скидок'
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
                top: '10vw',
                // right: '0',
                width: '40vw',
                height: '40vw',
                alignSelf: 'center',
                justifySelf: 'center',
              }}
              src={bigFlower}
              alt='flower'
            ></Image>
          ) : null}

          <TitleWithTextBlock
            title='Важно'
            blocks={pageData[0].text2.ru}
          ></TitleWithTextBlock>
        </Box>
      </DoubleBlock>

      {instagramPosts.data.length > 1 ? (
        <Box sx={{ my: 'max(100px,5vw)', px: '10%' }}>
          <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
        </Box>
      ) : null}
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "bonuscardPage"]
  {
    _id,
    title,
    text1,
    text2,
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
