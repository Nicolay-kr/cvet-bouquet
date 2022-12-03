import React from 'react';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';
import TitleWithTextBlock from '../src/components/titleWithTextBlock/TitleWithTextBlock';
import BreadCrumbs from '../src/components/breadcrubs/BreadCrumbs';

export default function PrivacyPage({ pageData }) {
  const breadCrumbsList = [
    { title: 'Главаная', href: '/' },
    { title: pageData[0].title.ru, href: null },
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
            title={pageData[0].title.ru}
            blocks={pageData[0].text.ru}
          ></TitleWithTextBlock>
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "privacyPage"]
  {
    _id,
    title,
    text,
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
