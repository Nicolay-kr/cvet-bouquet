import * as React from 'react';

import Box from '@mui/material/Box';
import ArcheMainConteiner from '../ArcheImageConteiners/ArcheMainConteiner';
import { urlFor } from '../../../sanity';
import ArcheSecondConteiner from '../ArcheImageConteiners/ArcheSecondConteiner';
import bigFlower from '../../../public/assets/images/bigFlower.png';
import MobileBlock from '../MobileBlock/MobileBlock';
import DesktopBlock from '../DesktopBlock/DesktopBlock';
import size from '../../utils/size';
import Image from 'next/future/image';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  isHedden=false,
  isSecondFlowerOnMainMobile=false
  mt=null
}) {

    const conteiner = React.useRef();;
    
    React.useEffect(() => {
      let ctx = gsap.context(() => {
        if(isSecondFlower){
          gsap.fromTo(".secondflower", {scale: 0},{delay:0.5,scale:1,duration:2,ease: "back.out(0.5)"})
          gsap.to(".secondflower", { delay:2.5, rotation: 360,
            repeat:-1,
            duration: 300,
          });
        }
        if(isMainFlower){
          gsap.fromTo(
            '.mainflower',
            { scale: 0 },
            { scale: 1, duration: 1.5, ease: 'back.out(0.5)', scrollTrigger: {
              trigger: '.mainflower',
            } }
          )
          gsap.to('.mainflower', {
            scrollTrigger: {
              trigger: '.mainflower',
            },
            rotation: 360,
            repeat:-1,
            duration: 300,
          });

        }
     

      }, conteiner);
      
      return () => ctx.revert();
    }, []);

  return (
    <Box
      ref={conteiner}
      component='section'
      width='100%'
      sx={{ mt: mt, px: { xs: '5%', lg: '10%' }, position: 'relative',
       overflow:isHedden?'hidden':'none',
      }}
    >
      {isSecondFlower ? (
        <DesktopBlock>
          <Image
          className='secondflower'
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '40vw',
              height: '40vw',
              transform:'scale(0)'
            }}
            priority
            src={bigFlower}
            alt='flower'
          ></Image>
        </DesktopBlock>
      ) : null}

      {isMainFlower ? (
        <Box
          component={Image}
          className='mainflower'
          sx={{
            position: 'absolute',
            top: { xs: '-10vw', lg: '-2vw' },
            left: { xs: '-8vw', lg: '40vw' },
            width: { xs: '80vw', lg: '47vw' },
            height: { xs: '80vw', lg: '47vw' },
            transform:'scale(0)'
          }}
          priority
          src={bigFlower}
          alt='flower'
        ></Box>
      ) : null}

      <Box
        sx={{
          mt: '0',
          position: 'relative',
          display: 'grid',
          columnGap: {...size(160),xl:120},
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
          {isSecondFlowerMobile || isSecondFlowerOnMainMobile ? (
            <MobileBlock>
              <Image
              className='secondflower'
                style={{
                  position: 'absolute',
                  right: isSecondFlowerOnMainMobile? '-25%':'-5%',
                  top: isSecondFlowerOnMainMobile? '-10%':'-15%',
                  width: '80vw',
                  height: '80vw',
                }}
                src={bigFlower}
                priority
                alt='flower'
              ></Image>
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
              mr: { xs: isSecondFlowerMobile ? '15%' : '0', lg: '0' },
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
