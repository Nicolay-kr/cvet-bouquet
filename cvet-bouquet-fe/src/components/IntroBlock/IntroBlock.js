import * as React from 'react';

import Box from '@mui/material/Box';
import ArcheMainConteiner from '../ArcheImageConteiners/ArcheMainConteiner';
import { urlFor } from '../../../sanity';
import ArcheSecondConteiner from '../ArcheImageConteiners/ArcheSecondConteiner';
import BigFlower from '../../../public/assets/images/bigFlower.svg';
import MobileBlock from '../MobileBlock';
import DesktopBlock from '../DesktopBlock';
import size from '../../utils/size';

export default function IntroBlock({
  mainImage,
  secondImage,
  textBlock,
  isMainFlower = false,
  isSecondFlower = false,
  isSecondFlowerMobile = false,
  desctopReverse = false,
  mobileReverse = false,
  isDrop = false,
}) {
  return (
    <Box
      component='section'
      width='100%'
      sx={{ px: { xs: '5%', lg: '10%' }, position: 'relative' }}
    >
      {isSecondFlower ? (
        <DesktopBlock>
          <Box
            viewBox='0 0 350 341'
            component={BigFlower}
            sx={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '40vw',
              height: '40vw',
            }}
          ></Box>
        </DesktopBlock>
      ) : null}

      {isMainFlower ? (
        <Box
          viewBox='0 0 350 341'
          component={BigFlower}
          sx={{
            position: 'absolute',
            top: { xs: '-10vw', lg: '-2vw' },
            left: { xs: '-8vw', lg: '39vw' },
            width: { xs: '80vw', lg: '47vw' },
            height: { xs: '80vw', lg: '47vw' },
          }}
        ></Box>
      ) : null}

      <Box
        sx={{
          mt: '0',
          position: 'relative',
          display: 'grid',
          columnGap: size(160),
          gridTemplateColumns: {
            xs: '1fr',
            lg: '5fr 6fr',
          },
          height: '100%',
        }}
      >
        <Box
          sx={{
            order: { xs: mobileReverse ? 2 : 1, lg: 1 },
            color: '#000000',
          }}
        >
          {textBlock}
        </Box>
        <Box
          sx={{
            mr: { xs: '0', lg: desctopReverse ? '60px' : '0px' },
            position: 'relative',
            order: { xs: mobileReverse ? 1 : 2, lg: 2 },
          }}
        >
          {isSecondFlowerMobile ? (
            <MobileBlock>
              <Box
                viewBox='0 0 350 341'
                component={BigFlower}
                sx={{
                  position: 'absolute',
                  right: '-5%',
                  top: '-15%',
                  width: '80vw',
                  height: '80vw',
                }}
              ></Box>
            </MobileBlock>
          ) : null}

          <Box sx={{ mt: { xs: '40px', lg: '60px' } }}>
            {mainImage ? (
              <ArcheMainConteiner
              priority={true}
                src={urlFor(mainImage)?.width(500)?.url()}
              ></ArcheMainConteiner>
            ) : null}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              right: '0',
              mr: { xs: isSecondFlower ? '15%' : '0', lg: '0' },
            }}
          >
            {secondImage ? (
              <ArcheSecondConteiner
                isDrop={isDrop}
                src={urlFor(secondImage)?.width(400)?.url()}
              ></ArcheSecondConteiner>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
