import React from 'react';
import styles from '../styles/MainPage.module.css';
import { useState, useEffect } from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import CaruselBlock from '../src/components/CaruselBlock/CaruselBlock';
import { sanityClient } from '../sanity';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import BouquetsContext, {
//   useAppContext,
// } from '../src/components/context/BouquetsContext';
import Link from '../node_modules/next/link';
import { useRouter } from '../node_modules/next/router';

export default function Home({ instagramPosts, category, pageData }) {
  const router = useRouter();
  // console.log(pageData[0].mainImage)
  // console.log(category)
  const [mappedBouquets, setMappedBouquets] = useState(category);
  // const [pageData, setMpageData] = useState(category);
  // const bouquetsContext = useAppContext();
  // bouquetsContext.setbouquetsCategories(mappedBouquets);

  // useEffect(() => {
  //   bouquetsContext.setbouquetsCategories(mappedBouquets);
  // }, []);
  const popular = mappedBouquets[7];
  console.log(pageData.mainImage);

  // const textBlock = (
    
  // );

  return (
    <>
      <IntroBlock
        mainImage={pageData[0].mainImage}
        secondImage={pageData[0].secondImage}
        textBlock={<Box className={styles.textBox}>
        <Box pt='100px' className={styles.textBoxTitle}>
          <Typography
            sx={{ fontSize: { md: '60px', xl: 'max(82px,4.3vw)' } }}
            variant='h2'
            component='h1'
          >
            Флористика
          </Typography>
          <Typography
            sx={{ fontSize: { md: '140px', xl: 'max(140px,7.3vw)' } }}
            variant='h1'
            component='h1'
            className={styles.specialFont}
          >
            с утонченным
          </Typography>
          <Typography
            sx={{
              fontSize: {
                md: '60px',
                xl: 'max(82px,4.3vw)',
              },
            }}
            variant='h2'
            component='h1'
          >
            вкусом
          </Typography>
        </Box>
        <Typography my='auto' variant='h4' component='p'>
          Выбирайте лучшее из того, что можно позволить. Создавайте сказку, не
          дожидаясь завтра!
        </Typography>
        <Box className={styles.buttonBox}>
          <Button
            sx={{ height: '60px', width: '100%', bgcolor: 'primary.main' }}
            variant='contained'
            // component={Link}
            // href='/catalog'
            onClick={() => router.push('/catalog')}
          >Выбрать букет</Button>
        </Box>
      </Box>}
      ></IntroBlock>
      <CaruselBlock
        bouquets={mappedBouquets}
        title={'Выберите '}
        subtitle={'категорию'}
        isSpec={true}
      ></CaruselBlock>
      {popular?.bouqets ? (
        <CaruselBlock
          bouquets={popular?.bouqets}
          title={'Популярные'}
          subtitle={'букеты'}
          categoryslug={popular.slug.current}
        ></CaruselBlock>
      ) : null}

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
  const query = `*[ _type == "mainPage"]
  {
    _id,
    title,
    text,
    mainImage,
    secondImage,

  }`;

  const resultCategory = await sanityClient.fetch(queryCategory);
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
        category: resultCategory,
        pageData: pageData,
      },
    };
  }
};
