import React from 'react';
import { useState } from 'react';
// import styles from './styles/BouquetPage.module.css';
import styles from '../../../styles/BouquetPage.module.css';
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

export const Bouquet = ({ bouquet, breadCrumbsList, instagramPosts }) => {
  const [quantity, setQuantity] = useState(1);
  const bouckeList = useAppContext();
  const [activeImg, setActiveImg] = useState(bouquet.images[0]);
  bouquet = {
    ...bouquet,
    imagePath: bouquet.images[0],
    quantity: quantity,
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
      desc: `Мы формируем букет для Вас максимально схожим с фото, сохраняя цветовую гамму и наполнение.  
      Также можем учесть Ваши особенные пожелания (поменять детали композиции, добавить любимый цветок,
         прикрепить фирменную открытку с Вашим текстом и  т.д.)`,
    },
    {
      title: 'Доставка',
      desc: `Мы формируем букет для Вас максимально схожим с фото, сохраняя цветовую гамму и наполнение.  
      Также можем учесть Ваши особенные пожелания (поменять детали композиции, добавить любимый цветок,
         прикрепить фирменную открытку с Вашим текстом и  т.д.)`,
    },
    {
      title: 'Уход за букетом',
      desc: `Мы формируем букет для Вас максимально схожим с фото, сохраняя цветовую гамму и наполнение.  
      Также можем учесть Ваши особенные пожелания (поменять детали композиции, добавить любимый цветок,
         прикрепить фирменную открытку с Вашим текстом и  т.д.)`,
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
          marginBottom: 'max(30px,2.1vw)',
          columnGap: 'max(30px,1.5vw)',
          rownGap: 'max(30px,1.5vw)',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '5fr 2fr',
            columnGap: 'max(30px,1.5vw)',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              objectFit: 'cover',
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
              rowGap: 'max(30px,1.5vw)',
            }}
          >
            {bouquet.images.map((image) => (
              <Box
                key={image._key}
                onClick={(e) => handleImageClick(e, image)}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '24vw', lg: 'min(240px,12.5vw)' },
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
            mt: '20px',
          }}
        >
          <Typography variant='h3' component='h1' color='#000000'>
            {bouquet.title}
          </Typography>
          <Typography
            sx={{ fontWeight: 700, mt: 7.5 }}
            variant='h3'
            component='p'
            color='#000000'
          >
            {bouquet.price}
            <Box sx={{ fontSize: '12px',pt:'4px' }} component='sup'>
              BYN
            </Box>
          </Typography>
          <Typography
            sx={{ mt: 4, opacity: '0.5' }}
            variant='body1'
            component='p'
            color='#000000'
          >
            Бесплатная доставка в пределах МКАД
          </Typography>
          <div className={styles.buttonsConteiner}>
            <CounterButtons
              id={bouquet.id}
              value={quantity}
              isFlexSize={true}
              customHandlers={{ plus: handlePlus, minus: handleMinus }}
            ></CounterButtons>
            <div className={styles.buttons}>
              <AddToCartButton
                bouquet={bouquet}
                variant='contained'
              ></AddToCartButton>
              <Button
                sx={{ ml: 2.5 }}
                variant='contained'
                color='primary'
                onClick={addToFavoritList}
              >
                <Image
                  className={styles.iconImage}
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
            </div>
          </div>
          <div className={styles.description}>
            <AccordionCustom fieldList={serviceList}></AccordionCustom>
          </div>
        </Box>

        <Box
          sx={{
            display: { xs: 'flex', lg: 'none' },
            flexDirection: 'column',
            mt: '20px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant='h3'
              component='h1'
              sx={{ fontSize: '18px !important' }}
            >
              {bouquet.title}
            </Typography>

            <Typography
              sx={{ fontWeight: 700, fontSize: '18px', ml: 'auto' }}
              variant='h3'
              component='p'
              color='#000000'
            >
              {bouquet.price}
              <Box sx={{ fontSize: '12px',pt:'4px' }} component='sup'>
                BYN
              </Box>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: '20px' }}>
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
              Бесплатная доставка в пределах МКАД
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', mt: '20px', height: '48px' }}>
            <AddToCartButton
              autoHeight={true}
              bouquet={bouquet}
              variant='contained'
            ></AddToCartButton>
            <Button
              sx={{ ml: 2.5 }}
              variant='contained'
              color='primary'
              onClick={addToFavoritList}
            >
              <Image
                className={styles.iconImage}
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

          <Box sx={{ mt: '40px' }}>
            <AccordionCustom fieldList={serviceList}></AccordionCustom>
          </Box>
        </Box>
      </Box>

      <Box sx={{ my: 'max(100px,5vw)', px: '10%' }}>
        <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
      </Box>
    </>
  );
};

export default Bouquet;
