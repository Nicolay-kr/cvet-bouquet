import React from 'react';
import { useState, useEffect } from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import CaruselBlock from '../src/components/CaruselBlock/CaruselBlock';
import { sanityClient } from '../sanity';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '../node_modules/next/link';
import { useRouter } from '../node_modules/next/router';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Home({ instagramPosts, category, pageData }) {
  const router = useRouter();
  const lg = useMediaQuery('(min-width:1200px)');
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

  // );

  return (
    <>
      <IntroBlock
        mainImage={pageData[0].mainImage}
        secondImage={pageData[0].secondImage}
        reverse={lg?false:true}
        textBlock={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height:'100%',
              order: { xs: '2', lg: '0' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                pt: { xs: '30px', lg: '100px' },
              }}
            >

              <Typography
                sx={{
                  fontSize: { xs: '36px', sm: '60px', xl: 'max(82px,4.3vw)' },
                  textAlign: { xs: 'end', md: 'start' },
                }}
                variant='h2'
                component='h1'
              >
                Флористика
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '64px', sm: '100px', xl: 'max(140px,7.3vw)' },
                  textAlign: 'center',
                }}
                variant='h1'
                component='h1'
              >
                с утонченным
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: '36px',
                    sm: '60px',
                    xl: 'max(82px,4.3vw)',
                  },
                  textAlign: 'end',
                }}
                variant='h2'
                component='h1'
              >
                вкусом
              </Typography>
            </Box>
            {lg ? (
              <Typography my='auto' variant='h4' component='p' sx={{mt:'auto'}}>
                Выбирайте лучшее из того, что можно позволить. Создавайте
                сказку, не дожидаясь завтра!
              </Typography>
            ) : null}

            <Box
              sx={{
                width: { xs: '100%', md: '50%' },
                mx:{xs: '0', md: 'auto',lg:'0' }
              }}
            >
              <Button
                sx={{
                  height: '60px',
                  width: '100%',
                  bgcolor: 'primary.main',
                  mt: { xs: '30px' },
                }}
                variant='contained'
                // component={Link}
                // href='/catalog'
                onClick={() => router.push('/catalog')}
              >
                Выбрать букет
              </Button>
            </Box>
          </Box>
        }
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
