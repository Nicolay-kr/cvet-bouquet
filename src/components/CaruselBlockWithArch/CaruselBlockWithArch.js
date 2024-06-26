import React, { useRef, useState } from 'react';
import styles from './CaruselBlock.module.css';

import Box from '@mui/material/Box';

import Image from 'next/future/image';
import LeftArrow from '../../../public/assets/icons/leftArrow.svg';
import RightArrow from '../../../public/assets/icons/rightArrow.svg';
import IconButton from '@mui/material/IconButton';
import TitleWithSubtitle from '../TitleWithSubtitle/TitleWithSubtitle';
import Carusel from '../carusels/Carusel';
import ArcheMainConteiner from '../ArcheImageConteiners/ArcheMainConteiner';
import Typography from '@mui/material/Typography';
import { urlFor } from '../../../sanity';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { EffectFade, Controller } from 'swiper';
import Link from '../CustopNextComponents/Link';
import bigFlower from '../../../public/assets/images/bigFlower.png';
import size from '../../utils/size';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/controller';
import TextsQuote from '../TextsQuote/TextsQuote';

gsap.registerPlugin(ScrollTrigger);

export default function CaruselBlockWithArch({
  bouquets,
  isSpec = false,
  title = null,
  subtitle = null,
  categoryslug = null,
  isPremium = null,
}) {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const caruselWithArchRef = useRef(null);

  const handleRightArrowClick = () => {
    caruselWithArchRef.current.swiper.slideNext();
  };
  const handleLeftArrowClick = () => {
    caruselWithArchRef.current.swiper.slidePrev();
  };

  const conteiner = React.useRef();

  React.useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.flower',
        { scale: 0 },
        { scale: 1, duration: 1.5, ease: 'back.out(0.5)', scrollTrigger: {
          trigger: '.conteiner',
        } }
      )
      gsap.to('.flower', {
        scrollTrigger: {
          trigger: '.conteiner',
        },
        rotation: 360,
        repeat:-1,
        duration: 300,
      });
    }, conteiner);

    return () => ctx.revert();
  }, []);

  const listItems =
    bouquets &&
    bouquets?.map((item, index) => (
      <SwiperSlide key={index}>
        <Box
          className='conteiner'
          component={Link}
          sx={{
            textDecoration: 'none',
            mt: size(100),
            position: 'relative',
          }}
          href={`/catalog/${
            isPremium
              ? `premium-floristika/${item.slug?.current}`
              : item.slug?.current
          }`}
        >
          <ArcheMainConteiner
            isSwiper={true}
            src={
              isPremium
                ? urlFor(item.images[0])?.width(500)?.url()
                : urlFor(item.mainImage)?.width(500)?.url()
            }
          />
          <Box
            sx={{
              pt: { xs: '16px' },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              width: '100%',
              justifyContent: { md: 'space-between' },
              alignItems: 'start',
              position: 'relative',
              minHeight: { xs: 94, xxl: '4.5vw' },
              backgroundColor: 'fon.main',
              px: '5px',
            }}
          >
            <Typography
              sx={{
                display: 'block',
                width: isPremium ? '70%' : '100%',
                // mt: '16px',
                textAlign: isPremium ? 'left' : 'center',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: { ...size(24), xs: 16 },
              }}
              variant='h3'
              component='p'
            >
              {item.title?.ru ? item.title?.ru : item.title}
            </Typography>
            {isPremium ? (
              <Typography
                gutterBottom
                variant='h3'
                component='p'
                sx={{ fontWeight: 700, display: 'flex', mb: '0', px: 5 }}
              >
                {item.price}{' '}
                <sup style={{ fontSize: '0.5em', paddingTop: '4px' }}>BYN</sup>
              </Typography>
            ) : null}
          </Box>
        </Box>
      </SwiperSlide>
    ));

  return (
    <Box
      ref={conteiner}
      component='section'
      sx={{
        width: '100%',
        pl: isSpec ? { xs: '5%', lg: '10%' } : 0,
        mt: !isPremium ? { ...size(150), xs: 80 } : '0',
      }}
    >
      {title || subtitle ? (
        <TitleWithSubtitle
          title={title}
          subtitle={subtitle}
        ></TitleWithSubtitle>
      ) : null}

      {isPremium ? null : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 0,
          }}
        >
          <IconButton
            onClick={handleLeftArrowClick}
            sx={{ marginLeft: isSpec ? 0 : { xs: '5vw', lg: '10vw' } }}
            aria-label='LeftArrowIcon'
          >
            <Box
              sx={{ width: { xs: '32px', sm: '60px', lg: '94px' } }}
              viewBox='0 0 104 18'
              component={LeftArrow}
            ></Box>
          </IconButton>
          <IconButton
            sx={{ marginRight: { xs: '5vw', lg: '10vw' } }}
            onClick={handleRightArrowClick}
            aria-label='RightArrowIcon'
          >
            <Box
              sx={{ width: { xs: '32px', sm: '60px', lg: '94px' } }}
              viewBox='0 0 104 18'
              component={RightArrow}
            ></Box>
          </IconButton>
        </Box>
      )}

      <Box sx={{ display: 'flex', position: 'relative' }}>
        <Box
          component={Image}
          src={bigFlower}
          className='flower'
          alt='fower imgage'
          sx={{
            position: 'absolute',
            top: isPremium ? '-4vw' : '-12vw',
            left: isPremium ? { xs: '-12vw', lg: '-7vw' } : '-12vw',
            width: { xs: '70vw', lg: isPremium ? '40vw' : '50vw' },
            height: { xs: '70vw', lg: isPremium ? '40vw' : '50vw' },
            pointerEvents: 'none',
            transform: 'scale(0)',
            '@media (max-height:724px) and (min-width:1200px)': {
              width: '36vw' ,
              height:'36vw' ,
              left: '-7vw',
              top: isPremium ?'-4vw':'-6vw',
            },
            
          }}
        ></Box>
        <Box
          sx={{
            position: 'relative',
            // top: { xs: '6vw', lg: '2vw' },
            width: { xs: '45vw', lg: '25.5vw' },
            '@media (max-height:724px) and (min-width:1200px)': {
              width: '22vw' ,
            },
            mr: { ...size(30), xs: 10 },
            // '&>div': { pb: '40px' },
          }}
        >
          <Swiper
            modules={[EffectFade, Controller]}
            effect={'fade'}
            slidesPerView={1}
            loopedSlides={listItems.length}
            grabCursor={true}
            loop={true}
            spaceBetween={10}
            onSwiper={setControlledSwiper}
            enabled={false}
            initialSlide={0}
          >
            {listItems}
          </Swiper>
        </Box>
        <Box sx={{ overflow: 'hidden', mt: 'auto' }}>
          {isPremium ? (
            <Box
              sx={{
                display: { xs: 'none', lg: 'block' },
                width: '60%',
                pl: '5%',
                ml: 'auto',
                mr: '10vw',
                mb: '40px',
                '@media (max-height:724px) and (min-width:1200px)': {
                  mb: '24px',
                },
              }}
            >
              <TextsQuote></TextsQuote>
            </Box>
          ) : null}

          <Carusel
            loopedSlides={bouquets.length - 1}
            controlledSwiper={controlledSwiper}
            bouquets={bouquets}
            caruselRef={caruselWithArchRef}
            isSpec={isSpec}
            categoryslug={categoryslug}
            isPremium={isPremium}
            initialSlide={1}
          />
        </Box>
      </Box>
    </Box>
  );
}
