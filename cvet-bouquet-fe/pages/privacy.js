import React from 'react';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import TitleWithTextBlock from '../src/components/titleWithTextBlock/TitleWithTextBlock';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';

export default function PrivacyPage({ data }) {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: data?.title.ru, href: null },
  ];
  return (
    <>
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
            mt: { xs: '20px' },
            mb: { xs: '40px',lg:'100px' },
            width: { xs: '100%',lg:'90%'},
          }}
        >
          <TitleWithTextBlock
            title={data?.title.ru}
            blocks={data?.text.ru}
          ></TitleWithTextBlock>
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "privacyPage"][0]
  {
    _id,
    title,
    text,
  }`;

  const data = await sanityClient.fetch(query);

  if (!data.length) {
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
