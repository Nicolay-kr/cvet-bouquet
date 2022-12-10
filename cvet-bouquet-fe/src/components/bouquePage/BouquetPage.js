import React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CounterButtons from '../CounterButtons/CounterButtons';
import butttonHeart from '../../../public/assets/icons/buttonHeart.svg';
import butttonHeartFill from '../../../public/assets/icons/buttonHeartFill.svg';
import Image from 'next/future/image';
import AccordionCustom from '../AccordionCustom/AccordionCustom';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import { useAppContext } from '../context/BouquetsContext';
import InstagramBlock from '../InstagramBlock/InstagramBlock';
import BreadCrumbs from '../breadcrubs/BreadCrumbs';
import { useRouter } from 'next/router';
import { urlFor } from '../../../sanity';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useEffect } from 'react';
import size from '../../utils/size';

export const BouquetPage = ({
  bouquet,
  breadCrumbsList,
  instagramPosts,
  generalInfo,
}) => {
  const [quantity, setQuantity] = useState(1);
  const bouckeList = useAppContext();
  const baseImage = bouquet.images[0];
  console.log(bouquet);

  const [activeImg, setActiveImg] = useState(baseImage);
  bouquet = {
    ...bouquet,
    imagePath: bouquet.images[0],
    quantity: quantity,
  };
  useEffect(() => {
    setActiveImg(baseImage);
  }, [baseImage]);

  const [animation] = useState(true);
  const handlePlus = () => {
    setQuantity((state) => state + 1);
  };
  const handleMinus = () => {
    setQuantity((state) => (state > 1 ? state - 1 : 1));
  };

  const addToFavoritList = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    bouckeList.addOrRemoveToFavorite(bouquet);
  };

  const serviceList = [
    {
      title: 'Описание',
      desc: bouquet.description,
    },
    {
      title: 'Доставка',
      desc: bouquet.delivery.delivery,
    },
    {
      title: 'Уход за букетом',
      desc: bouquet.care,
    },
  ];

  const router = useRouter();

  const handleImageClick = (e, image) => {
    setActiveImg(image);
  };

  return (
    <>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
          px: { xs: '5%', lg: '10%' },
          mb: size(32),
          columnGap: { xs: '16px', lg: 'max(30px,1.5vw)' },
          rownGap: { xs: '16px', lg: 'max(30px,1.5vw)' },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '5fr 2fr',
            columnGap: { xs: '16px', lg: 'max(30px,1.5vw)' },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              objectFit: 'cover',
              minHeight: { xs: '72vw', lg: '38vw' },
            }}
          >
            {/* {activeImg && ( */}
            <TransitionGroup>
              <CSSTransition
                key={activeImg._key}
                in={true}
                appear={true}
                timeout={1000}
                classNames='fade'
              >
                <Image
                  fill={true}
                  style={{ objectFit: 'cover' }}
                  src={urlFor(activeImg).width(400).url()}
                  alt='main bouquet image'
                ></Image>
              </CSSTransition>
            </TransitionGroup>
            {/* )} */}
          </Box>
          <Box
            sx={{
              display: 'grid',
              rowGap: { xs: '16px', lg: 'max(30px,1.5vw)' },
              alignContent: 'space-between',
            }}
          >
            {bouquet.images.map((image) => (
              <Box
                key={image._key}
                onClick={(e) => handleImageClick(e, image)}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '24vw', lg: '12.5vw' },
                  objectFit: 'cover',
                  cursor: 'pointer',
                  outline:
                    activeImg._key === image._key ? '4px solid #8C7B5F' : null,
                }}
              >
                {image && (
                  <Image
                    fill={true}
                    src={urlFor(image).width(400).url()}
                    style={{ objectFit: 'cover' }}
                    alt='bouquet image'
                  ></Image>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            mt: size(20),
          }}
        >
          <Typography variant='h3' component='h1' color='#000000'>
            {bouquet.title}
          </Typography>
          <Typography
            // sx={{ fontWeight: 700, mt:  {xs:32*0.5,md:32*0.75, xl:32, xxl:'>32'}}}
            sx={{ fontWeight: 700, mt: size(32) }}
            variant='h3'
            component='p'
            color='#000000'
          >
            {bouquet.price}
            <Box sx={{ fontSize: '12px', pt: 1 }} component='sup'>
              BYN
            </Box>
          </Typography>
          <Typography
            sx={{ mt: size(16), opacity: '0.5' }}
            variant='body1'
            component='p'
            color='#000000'
          >
            {bouquet.price >= generalInfo.deliveryMin ? (
              'Бесплатная доставка в пределах МКАД'
            ) : (
              <span>
                Стоимость доставки {generalInfo.deliveryPrice}
                <Box sx={{ fontSize: '0.5em', pt: size(4) }} component='sup'>
                  BYN
                </Box>
              </span>
            )}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              height: 'max(60px,3vw)',
              gridTemplateColumns: '2fr 3fr',
              marginTop: { ...size(60), xs: 20 },
              columnGap: size(30),
            }}
          >
            <CounterButtons
              id={bouquet.id}
              value={quantity}
              isFlexSize={true}
              customHandlers={{ plus: handlePlus, minus: handleMinus }}
            ></CounterButtons>
            <Box display='flex'>
              <AddToCartButton
                bouquet={bouquet}
                variant='contained'
              ></AddToCartButton>
              <Button
                sx={{ ml: size(10) }}
                variant='contained'
                color='primary'
                onClick={addToFavoritList}
              >
                <Image
                  src={
                    bouckeList.favoriteBouquets.find(
                      (item) => item.id === bouquet.id
                    )
                      ? butttonHeartFill
                      : butttonHeart
                  }
                  alt='heart icon'
                />
              </Button>
            </Box>
          </Box>
          <Box mt='auto'>
            <AccordionCustom fieldList={serviceList}></AccordionCustom>
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: 'flex', lg: 'none' },
            flexDirection: 'column',
            mt: { ...size(20), xs: 20 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h3' component='h1'>
              {bouquet.title}
            </Typography>

            <Typography
              sx={{ fontWeight: 700, ml: 'auto' }}
              variant='h3'
              component='p'
              color='#000000'
            >
              {bouquet.price}
              <Box sx={{ fontSize: '0.5em', pt: size(4) }} component='sup'>
                BYN
              </Box>
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: { ...size(20), xs: 20 },
            }}
          >
            <Box sx={{ width: '100px', height: '40px' }}>
              <CounterButtons
                id={bouquet.id}
                value={quantity}
                isFlexSize={true}
                customHandlers={{ plus: handlePlus, minus: handleMinus }}
              ></CounterButtons>
            </Box>

            <Typography
              sx={{
                ml: 'auto',
                opacity: '0.5',
                textAlign: 'end',
                width: '50%',
              }}
              variant='body1'
              component='p'
              color='#000000'
            >
              {bouquet.price >= generalInfo.deliveryMin ? (
                'Бесплатная доставка в пределах МКАД'
              ) : (
                <span>
                  Стоимость доставки {generalInfo.deliveryPrice}
                  <Box sx={{ fontSize: '12px', pt: size(4) }} component='sup'>
                    BYN
                  </Box>
                </span>
              )}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              mt: { ...size(20), xs: 20 },
              height: '48px',
            }}
          >
            <AddToCartButton
              autoHeight={true}
              bouquet={bouquet}
              variant='contained'
            ></AddToCartButton>
            <Button
              sx={{ ml: size(10) }}
              variant='contained'
              color='primary'
              onClick={addToFavoritList}
            >
              <Image
                src={
                  bouckeList.favoriteBouquets.find(
                    (item) => item.id === bouquet.id
                  )
                    ? butttonHeartFill
                    : butttonHeart
                }
                alt='heart icon'
              />
            </Button>
          </Box>

          <Box sx={{ mt: size(40) }}>
            <AccordionCustom fieldList={serviceList}></AccordionCustom>
          </Box>
        </Box>
      </Box>

      <Box sx={{ my: size(100), px: '10%' }}>
        <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
      </Box>
    </>
  );
};

export default BouquetPage;
