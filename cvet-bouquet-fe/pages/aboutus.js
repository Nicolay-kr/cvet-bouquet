import React from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import TitleWithTextBlock from '../src/components/titleWithTextBlock/TitleWithTextBlock';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';
import FreePayForm from '../src/components/freeForm/FreePayForm';
import size from '../src/utils/size';
import Head from 'next/head';


export default function AboutUs({ instagramPosts, data }) {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: `${data?.title.ru}`, href: null },
  ];

  return (
    <>
     <Head lang='ru'>
        <title> {data?.title.ru} | ЦВЕТ•БУКЕТ</title>
      </Head>
      <IntroBlock
        mainImage={data?.aboutusBlock.mainImage}
        secondImage={data?.aboutusBlock.secondImage}
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
            <Box sx={{ mt: size(40),'& div+div':{
              mt: size(60)
            }}}>
            {data?.aboutusBlock.articles.map((article)=>(
               <Box key={article._key}>
               <TitleWithTextBlock
                 title={article.title.ru}
                 blocks={article.text.ru}
               ></TitleWithTextBlock>
             </Box>

            ))}
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
  const query = `*[ _type == "aboutusPage"][0]
  {
    _id,
    title,
    aboutusBlock,
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
        data,
        instagramPosts,
      },
    };
  }
};
