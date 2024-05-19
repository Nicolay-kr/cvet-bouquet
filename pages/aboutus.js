import React from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import TitleWithTextBlock from '../src/components/TitleWithTextBlock/TitleWithTextBlock';
import BreadCrumbs from '../src/components/Breadcrubs/BreadCrumbs';
import FreePayForm from '../src/components/FreeForm/FreePayForm';
import size from '../src/utils/size';
import Head from 'next/head';


export default function AboutUs({ data }) {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: `${data?.title?.ru}`, href: null },
  ];

  return (
    <>
     <Head>
        <title>{`${data?.title?.ru} | ЦВЕТ•БУКЕТ`}</title>
        <meta property="og:title" content={`${data?.title?.ru} | ЦВЕТ•БУКЕТ`} />
        <meta property="og:url" content="https://cvetbuket.by/aboutus" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://cvetbuket.by/aboutus" />
      </Head>
      <IntroBlock
        mainImage={data?.aboutusBlock?.mainImage}
        secondImage={data?.aboutusBlock?.secondImage}
        isSecondFlower={true}
        isSecondFlowerMobile={true}
        isHedden={true}
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
            {data?.aboutusBlock?.articles.map((article)=>(
               <Box key={article._key}>
               <TitleWithTextBlock
                 title={article.title?.ru}
                 blocks={article.text?.ru}
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
