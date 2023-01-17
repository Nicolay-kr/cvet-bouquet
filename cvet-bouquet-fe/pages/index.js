import React from 'react';
import { useState } from 'react';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';
import Box from '@mui/material/Box';
import CaruselBlock from '../src/components/CaruselBlock/CaruselBlock';
import { sanityClient } from '../sanity';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import BlockContentBox from '../src/components/blockcontentBox/BlockContentBox';
import CaruselBlockWithArch from '../src/components/CaruselBlockWithArch/CaruselBlockWithArch';
import size from '../src/utils/size';
import Head from 'next/head';

export default function Home({ data }) {
  const router = useRouter();
  const lg = useMediaQuery('(min-width:1200px)');
  const [mappedBouquets, setMappedBouquets] = useState(data?.category);

  return (
    <>
      <Head>
        <title>{data?.title?.ru} | ЦВЕТ•БУКЕТ</title>
      </Head>
      {data?.firstBlock?.published ? (
        <IntroBlock
          mainImage={data?.firstBlock.mainImage}
          secondImage={data?.firstBlock.secondImage}
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
                  pt: { ...size(100), xs: 30 },
                  // width: { xs: '100%', md: '50%' },
                }}
              >
                <Typography
                  sx={{
                    fontSize: size(80),
                    textAlign: { xs: 'end', md: 'start' },
                    color: '#000000',
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
                      color: '#000000',
                    },
                    textAlign: 'right',
                  }}
                  variant='h1'
                  component='h1'
                >
                  с утонченным
                </Typography>
                <Typography
                  sx={{
                    fontSize: size(80),
                    color: '#000000',
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
                    blocks={data?.firstBlock.text?.ru}
                  ></BlockContentBox>
                </Box>
              ) : null}

              <Box
                sx={{
                  width: { xs: '100%', md: '50%' },
                  mb: 'auto',
                }}
              >
                <Button
                  sx={{
                    height: { ...size(60), xs: 60 },
                    width: { ...size(360), xs: '100%' },
                    bgcolor: 'primary.main',
                    mt: { ...size(64) },
                    fontSize: { xs: '18px', xl: '24px' },
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

      {mappedBouquets ? (
        <CaruselBlockWithArch
          bouquets={mappedBouquets}
          title={'Выберите '}
          subtitle={'категорию'}
          isSpec={true}
        ></CaruselBlockWithArch>
      ) : null}

      {data?.popularBouqets ? (
        <CaruselBlock
          bouquets={data?.popularBouqets}
          title={'Популярные'}
          subtitle={'букеты'}
          categoryslug='popular'
          customMt={{...size(200), xs: 0}}
        ></CaruselBlock>
      ) : null}

      {data?.secondBlock?.published ? (
        <Box sx={{ mt: size(200) }}>
          <IntroBlock
            mainImage={data?.secondBlock.mainImage}
            secondImage={data?.secondBlock.secondImage}
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
                <Box
                  sx={{
                    mt: { xs: '24px', lg: 'auto' },
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  <BlockContentBox
                    fs={32}
                    blocks={data?.secondBlock.text?.ru}
                  ></BlockContentBox>
                </Box>
                <Box
                  sx={{
                    width: { xs: '100%', md: '50%' },
                    mb: 'auto',
                  }}
                >
                  <Button
                    sx={{
                      height: { ...size(60), xs: 60 },
                      width: { ...size(360), xs: '100%' },
                      bgcolor: 'primary.main',
                      mt: { ...size(120), xs: 32 },

                      fontSize: { xs: '18px', xl: '24px' },
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
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "mainPage"][0]
  {
    _id,
    title,
    firstBlock,
    secondBlock,
    popularBouqets[]->{
      _id,
      title,
      slug,
      images,
      price,
      description,
      "delivery":*[_type == "generalInfo"][0]{deliveryPrice,deliveryMin}
    },
    "category": *[ _type == "category"]
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
        "delivery":*[_type == "generalInfo"][0]{deliveryPrice,deliveryMin}
      },
    }
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
        data,
      },
    };
  }
};
