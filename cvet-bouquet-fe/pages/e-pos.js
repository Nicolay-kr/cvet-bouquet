import React from 'react';
import style from '../styles/pages/AboutUs.module.css';
import { useState, useEffect } from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import Typography from '@mui/material/Typography';
import TitleWithTextBlock from '../src/components/titleWithTextBlock/TitleWithTextBlock';

export default function EposPage({ pageData }) {
  return (
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
          title={pageData[0].title.ru}
          blocks={pageData[0].text.ru}
        ></TitleWithTextBlock>

        <Box
          sx={{
            mt: 'max(40px,2.1vw)',
            '& p': { fontWeight: '700' },
          }}
        >
          <Typography variant='h5' component='p'>
            Ссылка для оплаты:
          </Typography>
          <Typography variant='h5' component='p'>
            {pageData[0].link}
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
            <span>{pageData[0].code}</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "eposPage"]
  {
    _id,
    title,
    text,
    link,
    code,
 
  }`;

  const pageData = await sanityClient.fetch(query);

  if (!pageData.length) {
    return {
      props: {
        pageData: [],
      },
    };
  } else {
    return {
      props: {
        pageData: pageData,
      },
    };
  }
};
