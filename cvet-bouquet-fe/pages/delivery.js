import React from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import TitleWithTextBlock from '../src/components/titleWithTextBlock/TitleWithTextBlock';
import DoubleBlock from '../src/components/doubleBlock/DoubleBlock';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/future/image';
import bigFlower from '../public/assets/images/bigFlower.svg';
import AccordionCustom from '../src/components/AccordionCustom/AccordionCustom';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';
import Head from 'next/head';
import size from '../src/utils/size';

export default function DeliveryPage({ data }) {
  const lg = useMediaQuery('(min-width:1200px)');
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: data?.title.ru, href: null },
  ];
  return (
    <>
      <Head lang='ru'>
        <title> {data?.title.ru} | ЦВЕТ•БУКЕТ</title>
      </Head>
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
            title={data?.title.ru}
            blocks={data?.text1.ru}
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
            blocks={data?.text2.ru}
          ></TitleWithTextBlock>
        </Box>
      </DoubleBlock>
      <IntroBlock
        desctopReverse={true}
        mainImage={data?.mainImage}
        secondImage={data?.secondImage}
        isDrop={true}
        textBlock={
          <Box sx={{ mt: { xs: '40px', lg: '35%' } }}>
            <AccordionCustom
              fieldList={data?.conditions}
            ></AccordionCustom>
          </Box>
        }
      ></IntroBlock>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "deliveryPage"][0]
  {
    _id,
    title,
    text1,
    text2,
    conditions,
    mainImage,
    secondImage,
  }`;

  const data = await sanityClient.fetch(query);

  return {
    props: {
      data,
    },
  };
};
