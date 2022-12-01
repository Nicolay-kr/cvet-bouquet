import * as React from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArcheMainConteiner from '../ArcheImageConteiners/ArcheMainConteiner';
import { urlFor } from '../../../sanity';
import { NextSanityIMG } from '../CustopNextComponents/NextSanityIMG';
import ArcheSecondConteiner from '../ArcheImageConteiners/ArcheSecondConteiner';
import bigFlower from '../../../public/assets/images/bigFlower.svg';
import Image from 'next/future/image';
// import useMediaQuery from '@mui/material/useMediaQuery';
import MobileBlock from '../MobileBlock';
import DesktopBlock from '../DesktopBlock';

export default function IntroBlock({
  mainImage,
  secondImage,
  textBlock,
  isMainFlower = false,
  isSecondFlower = false,
  isSecondFlowerMobile = false,
  reverse = false,
  isDrop = false,
}) {
  // const lg = useMediaQuery('(min-width:1200px)');

  return (
    <Box
      component='section'
      width='100%'
      sx={{ px: { xs: '5%', lg: '10%' }, position: 'relative' }}
    >
      {isSecondFlower ? (
        <DesktopBlock>
          <Image
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '40vw',
              height: '40vw',
            }}
            src={bigFlower}
            alt='flower'
          ></Image>
        </DesktopBlock>
      ) : null}

      <Box
        sx={{
          mt: '0',
          position: 'relative',
          display: 'grid',
          columnGap: 'max(30px, 1.5vw)',
          gridTemplateColumns: {
            xs: '1fr',
            lg: reverse ? '7fr 5fr' : '5fr 7fr',
          },
          height: '100%',
          order: reverse ? 2 : 1,
        }}
      >
        <Box
          sx={{
            order: reverse ? 2 : 1,
            color: '#000000',
          }}
        >
          {textBlock}
        </Box>
        <Box
          sx={{
            ml: { xs: '0', lg: reverse ? '0px' : '60px' },
            mr: { xs: '0', lg: reverse ? '60px' : '0px' },
            position: 'relative',
            order: reverse ? 1 : 2,
          }}
        >
          {/* {!lg && isSecondFlowerMobile ? (
            <Image
              style={{
                position: 'absolute',
                right: '-5%',
                top: '-15%',
                width: '80vw',
                height: '80vw',
              }}
              src={bigFlower}
              alt='flower'
            ></Image>
          ) : null} */}

          {isSecondFlowerMobile ? (
            <MobileBlock>
              <Image
                style={{
                  position: 'absolute',
                  right: '-5%',
                  top: '-15%',
                  width: '80vw',
                  height: '80vw',
                }}
                src={bigFlower}
                alt='flower'
              ></Image>
            </MobileBlock>
          ) : null}

          <Box sx={{ mt: { xs: '40px', lg: '60px' } }}>
            <ArcheMainConteiner
              src={urlFor(mainImage).width(500).url()}
            ></ArcheMainConteiner>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              right: '0',
              mr: { xs: isSecondFlower ? '15%' : '0', lg: '0' },
            }}
          >
            <ArcheSecondConteiner
              isDrop={isDrop}
              src={urlFor(secondImage).width(500).url()}
            ></ArcheSecondConteiner>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
