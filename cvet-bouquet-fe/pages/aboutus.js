import React from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import TitleWithTextBlock from '../src/components/titleWithTextBlock/TitleWithTextBlock';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';
import FreePayForm from '../src/components/freeForm/FreePayForm';
import size from '../src/utils/size';


export default function AboutUs({ instagramPosts, pageData }) {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: `${pageData[0].title.ru}`, href: null },
  ];

  return (
    <>
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
              // mt: { xs: '0', lg: 'max(40px,2.1vw)' },
              mb: { xs: '40px', lg: '0' },
            }}
          >
            <BreadCrumbs
              isInIntro={true}
              breadCrumbsList={breadCrumbsList}
            ></BreadCrumbs>
            <Box sx={{ mt: { xs: '0', lg: 'max(40px,2.1vw)' } }}>
              <TitleWithTextBlock
                title={pageData[0].title.ru}
                blocks={pageData[0].text.ru}
              ></TitleWithTextBlock>
            </Box>
          </Box>
        }
      ></IntroBlock>
      <Box sx={{ px: { xs: '5%', lg: '10%' }, mt:size(100) }}>
        <FreePayForm isContactsForm={true}></FreePayForm>
      </Box>
      <Box
        component='section'
        sx={{ my: size(300), px: { xs: '5%', lg: '10%' } }}
      >
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
