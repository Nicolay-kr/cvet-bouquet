import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../../styles//BouquetPage.module.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CounterButtons from '../../src/components/CounterButtons/CounterButtons';
import butttonHeart from '../../public/assets/icons/buttonHeart.svg';
import butttonHeartFill from '../../public/assets/icons/buttonHeartFill.svg';
import Image from 'next/future/image';
import AccordionCustom from '../../src/components/AccordionCustom/AccordionCustom';
import AddToCartButton from '../../src/components/AddToCartButton/AddToCartButton';
import { useAppContext } from '../../src/components/context/BouquetsContext';
import InstagramBlock from '../../src/components/InstagramBlock/InstagramBlock';
import BreadCrumbs from '../../src/components/breadcrubs/BreadCrumbs';
import { useRouter } from 'next/router';
import { sanityClient, urlFor } from '../../sanity';
import { TransitionGroup,CSSTransition } from 'react-transition-group';

export const Bouquet = ({
  id,
  title,
  description,
  images,
  price,
  slug,
  instagramPosts,
  category,
  }) => {
  const [quantity, setQuantity] = useState(1);
  const bouckeList = useAppContext();
  const [activeImg, setActiveImg] = useState(images[0]);
  const bouquet = {
    id,
    title,
    description,
    imagePath: images[0],
    price,
    quantity: quantity,
    slug,
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
  
  const breadCrumbsList = [
    { title: 'Главаная', href: '/' },
    { title: 'Избранное', href: '/favorites' },
    { title: title, href: null },
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
                  in={activeImg}
                  appear={true}
                  timeout={1000}
                  classNames='fade'
                >
                  <Image
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    src={urlFor(activeImg).width(500).url()}
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
            {images.map((image) => (
              <Box
                onClick={(e) => handleImageClick(e, image)}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '24vw', lg: 'min(240px,12.5vw)' },
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              >
                {image && (
                  <Image
                    fill={true}
                    src={urlFor(image).width(500).url()}
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
          <Typography variant='h3' component='h1' color='initial'>
            {title}
          </Typography>
          <Typography
            sx={{ fontWeight: 700, mt: 7.5 }}
            variant='h3'
            component='p'
            color='initial'
          >
            {price}
            <sup>BYN</sup>
          </Typography>
          <Typography
            sx={{ mt: 4, opacity: '0.5' }}
            variant='body1'
            component='p'
            color='initial'
          >
            Бесплатная доставка в пределах МКАД
          </Typography>
          <div className={styles.buttonsConteiner}>
            <CounterButtons
              id={id}
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
                    bouckeList.favoriteBouquets.find((item) => item.id === id)
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
              {title}
            </Typography>
  
            <Typography
              sx={{ fontWeight: 700, fontSize: '18px', ml: 'auto' }}
              variant='h3'
              component='p'
              color='initial'
            >
              {price}
              <Box sx={{ fontSize: '10px' }} component='sup'>
                BYN
              </Box>
            </Typography>
          </Box>
  
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '20px' }}>
            <Box sx={{ width: '100px', height: '40px' }}>
              <CounterButtons
                id={id}
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
              color='initial'
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
                  bouckeList.favoriteBouquets.find((item) => item.id === id)
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
  

  export const getServerSideProps = async (pageContext) => {
    const boucketSlug = pageContext.query.boucketSlug;
    const categorySlug = pageContext.query.slug;
  
    if (!boucketSlug) {
      return {
        notFound: true,
      };
    }
  
    const query = `*[ _type == "bouquet" && slug.current == "${boucketSlug}" ]{
      _id,
      title,
      slug,
      images,
      price,
      description,
    }`;
  
    const queryCategory = `*[ _type == "category" && slug.current == "${categorySlug}"]
    {
      _id,
      slug,
      title,
    }`;
  
    const resultCategory = await sanityClient.fetch(queryCategory);
    const result = await sanityClient.fetch(query);
    const bouquet = result[0];
  
    const instagramUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`;
    const data = await fetch(instagramUrl);
    const instagramPosts = await data.json();
  
    if (!result) {
      return {
        notFound: true,
      };
    } else {
      return {
        props: {
          description: bouquet.description.ru,
          title: bouquet.title.ru,
          images: bouquet.images,
          price: bouquet.price,
          slug: bouquet.slug,
          id: bouquet._id,
          instagramPosts: instagramPosts ? instagramPosts : [],
          category: resultCategory,
        },
      };
    }
  };
  

export default Bouquet;
