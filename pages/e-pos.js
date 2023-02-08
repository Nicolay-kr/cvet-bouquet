import React from 'react';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import Typography from '@mui/material/Typography';
import TitleWithTextBlock from '../src/components/TitleWithTextBlock/TitleWithTextBlock';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';
import Head from 'next/head';

export default function EposPage({ data }) {
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
      <Box
        sx={{
          px: { xs: '5%', lg: '10%' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 'max(40px,2.1vw)',
            mb: { xs: '40px', lg: '200px' },
            width: { xs: '100%', lg: '50%' },
          }}
        >
          <TitleWithTextBlock
            title={data?.title?.ru}
            blocks={data?.text?.ru}
          ></TitleWithTextBlock>

          <Box
            sx={{
              mt: 'max(40px,2.1vw)',
              '& p': { fontWeight: '700' },
            }}
          >
            <Typography variant='h5' component='p' >
              Ссылка для оплаты:
            </Typography>
            <Typography variant='h5' component='a' href={data?.link} target='_blank'>
              {data?.link}
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 'max(40px,2.1vw)',
            }}
          >
            <Typography variant='h5' sx={{ '& span': { fontWeight: '700' } }}>
              или в дереве ЕРИП выберите услугу <br />
              "E-POS - оплата товаров и услуг" и введите код{' '}
              <span>{data?.code}</span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "eposPage"][0]
  {
    _id,
    title,
    text,
    link,
    code,
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
