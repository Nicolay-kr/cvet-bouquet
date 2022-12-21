import React from 'react';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import TitleWithTextBlock from '../src/components/titleWithTextBlock/TitleWithTextBlock';
import DoubleBlock from '../src/components/doubleBlock/DoubleBlock';
import useMediaQuery from '@mui/material/useMediaQuery';
import BigFlower from '../public/assets/images/bigFlower.svg';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';
import Head from 'next/head';
import size from '../src/utils/size';

export default function BonusCardPage({ data }) {
  const lg = useMediaQuery('(min-width:1200px)');
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: data?.title?.ru, href: null },
  ];
  return (
    <>
       <Head>
        <title> {data?.title?.ru} | ЦВЕТ•БУКЕТ</title>
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
            title='Система скидок'
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
            <Box
            component={BigFlower}
            viewBox="0 0 350 341"
            sx={{
              position: 'absolute',
                  top: '6vw',
                  width: '40vw',
                  height: '40vw',
                  alignSelf: 'center',
                  justifySelf: 'center',
            }}
          ></Box>
          ) : null}

          <TitleWithTextBlock
            title='Важно'
            blocks={data?.text2.ru}
          ></TitleWithTextBlock>
        </Box>
      </DoubleBlock>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "bonuscardPage"][0]
  {
    _id,
    title,
    text1,
    text2,
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
        data,
      },
    };
  }
};
