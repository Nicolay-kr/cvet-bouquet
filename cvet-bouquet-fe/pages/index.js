import React from 'react';
import styles from '../styles/Home.module.css';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import CaruselBlock from '../src/components/CaruselBlock/CaruselBlock';

export default function Home({ bouquets, instagramPosts }) {
  const router = useRouter();
  const [mappedBouquets, setMappedBouquets] = useState([]);
  const caruselRef = useRef(null);

  useEffect(() => {
    if (bouquets.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: '444cz5oj',
        dataset: 'production',
      });

      setMappedBouquets(
        bouquets.map((p) => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.images[0]).width(720).height(900),
          };
        })
      );
    } else {
      setMappedBouquets([]);
    }
  }, [bouquets]);

  const orderedBouquetsList = mappedBouquets?.sort((a, b) => a.order - b.order);
  // console.log(orderedBouquetsList);

  return (
    <>
      <IntroBlock></IntroBlock>
      <CaruselBlock bouquets={orderedBouquetsList} title={'Выберите '} subtitle={'категорию'} isSpec={true}></CaruselBlock>
      <CaruselBlock bouquets={orderedBouquetsList} title={'Популярные'} subtitle={'букеты'}></CaruselBlock>
      <Box sx={{ my: 'max(100px,5vw)', px: '10%' }}>
        <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
      </Box>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[ _type == "bouquet" ]');
  const url = `https://444cz5oj.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  const instagramUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`;
  const data = await fetch(instagramUrl);
  const instagramPosts = await data.json();

  // if (!result.result || !result.result.length) {
  if (!instagramPosts.data || !instagramPosts.data.length) {
    return {
      props: {
        bouquets: [],
      },
    };
  } else {
    return {
      props: {
        bouquets: result.result,
        instagramPosts,
      },
    };
  }
};
