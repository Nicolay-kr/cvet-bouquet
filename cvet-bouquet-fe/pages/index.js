import React from 'react';
import styles from '../styles/Home.module.css';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import CaruselBlock from '../src/components/CaruselBlock/CaruselBlock';
import { sanityClient } from '../sanity';
import Bouquet from './catalog/[slug]';

export default function Home({ instagramPosts, category }) {
  const router = useRouter();
  const [mappedBouquets, setMappedBouquets] = useState([]);
  const caruselRef = useRef(null);
  console.log(category);

  useEffect(() => {
    if (category?.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: '444cz5oj',
        dataset: 'production',
      });

      setMappedBouquets(
        category.map((p) => {
          return {
            ...p,
            bouqets: p.bouqets.map(bouqet=>{
              return {
                ...bouqet,
                images: bouqet.images.map(image=>imgBuilder.image(image).width(720).height(900)),

              }
            }
            ),
            mainImage: imgBuilder.image(p.mainImage).width(720).height(900),
          };
        })
      );
    } else {
      setMappedBouquets([]);
    }
  }, [category]);
  // const popular = mappedBouquets.find((category=>category.slug.current==='populyarnye-buket'))
  const popular = mappedBouquets[7];
  console.log('popular',popular);

  // const orderedBouquetsList = mappedBouquets?.sort((a, b) => a.order - b.order);
  // const orderedCategorysList = mappedBouquets?.sort(
  //   (a, b) => a.order - b.order
  // );
  // console.log(orderedBouquetsList);

  return (
    <>
      <IntroBlock></IntroBlock>
      <CaruselBlock
        bouquets={mappedBouquets}
        title={'Выберите '}
        subtitle={'категорию'}
        isSpec={true}
      ></CaruselBlock>
      {popular?.bouqets? (    <CaruselBlock
        bouquets={popular?.bouqets}
        title={'Популярные'}
        subtitle={'букеты'}
      ></CaruselBlock>):null}
  
      <Box sx={{ my: 'max(100px,5vw)', px: '10%' }}>
        <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
      </Box>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const queryCategory = `*[ _type == "category"]
  {
    _id,
    slug,
    title,
    mainImage,
    bouqets[]->{
      _id,
      title,
      slug,
      images,
      price,
      description,
    },
  }`;

  const resultCategory = await sanityClient.fetch(queryCategory);

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
        category: resultCategory,
      },
    };
  }
};
