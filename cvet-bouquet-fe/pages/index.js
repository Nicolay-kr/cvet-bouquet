import React from 'react';
import { useState, useEffect } from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import InstagramBlock from '../src/components/InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import CaruselBlock from '../src/components/CaruselBlock/CaruselBlock';
import { sanityClient } from '../sanity';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import BlockContentBox from '../src/components/blockcontentBox/BlockContentBox';
import CaruselBlockWithArch from '../src/components/CaruselBlockWithArch/CaruselBlockWithArch';

export default function Home({ instagramPosts, category, pageData }) {
  const router = useRouter();
  const lg = useMediaQuery('(min-width:1200px)');
  const [mappedBouquets, setMappedBouquets] = useState(category);

  // const [pageData, setMpageData] = useState(category);
  // const bouquetsContext = useAppContext();
  // bouquetsContext.setbouquetsCategories(mappedBouquets);

  // useEffect(() => {
  //   bouquetsContext.setbouquetsCategories(mappedBouquets);
  // }, []);

  const popular = mappedBouquets[7];
  console.log(mappedBouquets)

  return (
    <>
      {pageData[0].firstBlock.published ? (
        <IntroBlock
          mainImage={pageData[0].firstBlock.mainImage}
          secondImage={pageData[0].firstBlock.secondImage}
          mobileReverse={true}
          textBlock={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  pt: { xs: '30px', lg: '100px' },
                  // width: { xs: '100%', md: '50%' },
                  
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '36px', sm: '60px', xl: 'max(82px,4.3vw)' },
                    textAlign: { xs: 'end', md: 'start' },
                    color:'#000000'
                  }}
                  variant='h2'
                  component='h1'
                >
                  Флористика
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: '64px',
                      sm: '100px',
                      xl: 'max(140px,7.3vw)',
                      color:'#000000'
                    },
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
                      color:'#000000',
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
                <Box sx={{ my: 'auto' }}>
                  <BlockContentBox
                    fs={32}
                    blocks={pageData[0].firstBlock.text.ru}
                  ></BlockContentBox>
                </Box>
              ) : null}

              <Box
                sx={{
                  width: { xs: '100%', md: '50%' },
                  mx: { xs: '0', md: 'auto', lg: '0' },
                }}
              >
                <Button
                  sx={{
                    height: '60px',
                    width: '100%',
                    bgcolor: 'primary.main',
                    mt: { xs: '30px' },
                    fontSize: { xs: '18px', md: '24px' },
                    fontWeight: { xs: '600' },
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
      ) : null}

      <CaruselBlockWithArch
        bouquets={mappedBouquets}
        title={'Выберите '}
        subtitle={'категорию'}
        isSpec={true}
      ></CaruselBlockWithArch>

      {popular?.bouqets ? (
        <CaruselBlock
          bouquets={popular?.bouqets}
          title={'Популярные'}
          subtitle={'букеты'}
          categoryslug={popular.slug.current}
        ></CaruselBlock>
      ) : null}

      {pageData[0].secondBlock.published ? (
        <Box sx={{ mt: { xs: '60px', lg: '100px' } }}>
          <IntroBlock
            mainImage={pageData[0].secondBlock.mainImage}
            secondImage={pageData[0].secondBlock.secondImage}
            isDrop={true}
            mobileReverse={true}
            isMainFlower={true}
            textBlock={
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  width: '100%',
                }}
              >
                <Box sx={{ my: 'auto',mt:{xs:'40px',lg:'auto'} }}>
                  <BlockContentBox
                    fs={32}
                    blocks={pageData[0].secondBlock.text.ru}
                  ></BlockContentBox>
                </Box>
                <Box
                  sx={{
                    width: { xs: '100%', md: '50%' },
                    mx: { xs: '0', md: 'auto', lg: '0' },
                  }}
                >
                  <Button
                    sx={{
                      height: '60px',
                      width: '100%',
                      bgcolor: 'primary.main',
                      mt: { xs: '30px' },
                      fontSize: { xs: '18px', md: '24px' },
                      fontWeight: { xs: '600' },
                    }}
                    variant='contained'
                    onClick={() => router.push('/catalog')}
                  >
                    Выбрать букет
                  </Button>
                </Box>
              </Box>
            }
          ></IntroBlock>
        </Box>
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
    firstBlock,
    secondBlock,
  }`;

  const bouquetsQuery = `*[ _type == "bouquet"]
  {
    _id,
    title,
    slug,
    images,
    price,
    description,
  }`;

  const resultCategory = await sanityClient.fetch(queryCategory);
  const pageData = await sanityClient.fetch(query);
  const bouquets = await sanityClient.fetch(bouquetsQuery);

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
        bouquets: bouquets,
      },
    };
  }
};
