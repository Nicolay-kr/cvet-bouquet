import React, { useRef } from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CounterButtons from '../CounterButtons/CounterButtons';
import ButttonHeart from '../../../public/assets/icons/buttonHeart.svg';
import ButttonHeartFill from '../../../public/assets/icons/buttonHeartFill.svg';
import Image from 'next/future/image';
import AccordionCustom from '../AccordionCustom/AccordionCustom';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import { useAppContext } from '../context/BouquetsContext';
import BreadCrumbs from '../Breadcrubs/BreadCrumbs';
import { urlFor } from '../../../sanity';
import size from '../../utils/size';
import BouquetCarusel from '../BouquetCarusel/BouquetCarusel';
import SuccsessModal from '../SuccsessModal/SuccsessModal';

export const BouquetPage = ({ bouquet, breadCrumbsList, generalInfo }) => {
  const [quantity, setQuantity] = useState(1);
  const bouckeList = useAppContext();
  const bouquetCaruselhRef = useRef(null);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [formProcessing, setFormProcessing] = React.useState(false);

  const [activeImg, setActiveImg] = useState(1);
  bouquet = {
    ...bouquet,
    imagePath: bouquet.images ? bouquet.images[0] : null,
    quantity: quantity,
    deliveryPrice: generalInfo.deliveryPrice,
    deliveryMin: generalInfo.deliveryMin,
  };

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
      desc: bouquet.description?bouquet.description:'',
    },
    {
      title: 'Доставка',
      desc: bouquet.delivery?.delivery,
    },
    {
      title: 'Уход за букетом',
      desc: bouquet.care?bouquet.care:'',
    },
  ];

  const handleImageClick = (index) => {
    bouquetCaruselhRef.current.swiper.slideTo(index + 1);
    setActiveImg(index);
  };

  const bouquetImagesList = bouquet?.images?.map(
    (image) =>
      image && (
        <Image
          fill={true}
          sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
          src={urlFor(image)?.width(600)?.url()}
          style={{ objectFit: 'cover' }}
          alt='bouquet image'
        ></Image>
      )
  );

  const bouquetImagesListFullScreen = bouquet?.images?.map(
    (image) =>
      image && (
        <Image
          fill={true}
          sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              50vw'
          src={urlFor(image)?.width(900)?.url()}
          style={{ objectFit: 'cover' }}
          alt='bouquet image'
        ></Image>
      )
  );

  const onClose = () => {
    setIsOpenModal(false);
  };

  const mainImgClickHandle = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <SuccsessModal
        onClose={onClose}
        open={isOpenModal}
        formProcessing={formProcessing}
      >
        <Box sx={{ width: 'min(90vh,90vw)', height: 'min(90vh,90vw)' }}>
          <BouquetCarusel
            listItems={bouquetImagesListFullScreen}
            initialSlide={activeImg}
          ></BouquetCarusel>
        </Box>
      </SuccsessModal>

      <Box
        component='section'
        sx={{
          display: 'grid',
          position: 'relative',
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
            position: 'relative',
            gridTemplateColumns: '5fr 2fr',
            columnGap: { xs: '16px', lg: 'max(30px,1.5vw)' },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: { xs: '64vw', lg: '31vw' },
              objectFit: 'cover',
              minHeight: { xs: '72vw', lg: '38vw' },
              overflow: 'hidden',
            }}
            onClick={mainImgClickHandle}
          >
            {bouquetImagesList ? (
              <BouquetCarusel
                listItems={bouquetImagesList}
                caruselRef={bouquetCaruselhRef}
                setActiveIndex={setActiveImg}
              ></BouquetCarusel>
            ) : null}
          </Box>
          <Box
            sx={{
              display: 'grid',
              rowGap: { xs: '16px', lg: 'max(30px,1.5vw)' },
              alignContent: 'space-between',
            }}
          >
            {bouquetImagesList?.map((image, index) => (
              <Box
                key={index}
                onClick={() => handleImageClick(index)}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '24vw', lg: '12.5vw' },
                  objectFit: 'cover',
                  cursor: 'pointer',
                  // outline: activeImg === index ? '4px solid #8C7B5F' : null,
                }}
              >
                {image}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
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
              height: { ...size(60), xs: 45 },
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
                sx={{ ml: size(10), height: { ...size(60), xs: 45 } }}
                variant='contained'
                color='primary'
                onClick={addToFavoritList}
              >
                <Box
                  component={
                    bouckeList.favoriteBouquets.find(
                      (item) => item.id === bouquet.id
                    )
                      ? ButttonHeartFill
                      : ButttonHeart
                  }
                  alt='heart icon'
                ></Box>
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
                  <Box sx={{ fontSize: '0.5em', pt: size(4) }} component='sup'>
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
              <Box
                component={
                  bouckeList.favoriteBouquets.find(
                    (item) => item.id === bouquet.id
                  )
                    ? ButttonHeartFill
                    : ButttonHeart
                }
                alt='heart icon'
              ></Box>
            </Button>
          </Box>

          <Box sx={{ mt: size(40) }}>
            <AccordionCustom fieldList={serviceList}></AccordionCustom>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BouquetPage;
