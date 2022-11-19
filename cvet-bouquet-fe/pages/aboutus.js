import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import { sanityClient } from '../sanity';

export default function Home({ instagramPosts, pageData }) {
  const [mappedPageData, setMappedPageData] = useState([]);
  console.log(mappedPageData)

  useEffect(() => {
    if (pageData?.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: '444cz5oj',
        dataset: 'production',
      });

      setMappedPageData(
        pageData.map((p) => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(720).height(900),
            secondImage: imgBuilder.image(p.mainImage).width(720).height(900),
          };
        })
      );
    } else {
      setMappedPageData([]);
    }
  }, [pageData]);

  return (
    <>
      <IntroBlock mainImage={undefined} secondImage={undefined} textBlock={undefined}></IntroBlock>
      <Box sx={{ my: 'max(100px,5vw)', px: '10%' }}>
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
