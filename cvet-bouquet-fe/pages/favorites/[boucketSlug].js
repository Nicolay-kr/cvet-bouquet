import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
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
import { sanityClient } from '../../sanity';

export const Bouquet = ({
  id,
  title,
  description,
  image,
  price,
  slug,
  instagramPosts,
  categorySlug,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [quantity, setQuantity] = useState(1);
  const bouckeList = useAppContext();
  const imgBuilder = imageUrlBuilder({
    projectId: '444cz5oj',
    dataset: 'production',
  });
  const imagePath = imgBuilder.image(image).width(720).height(900);
  const bouquet = {
    id,
    title,
    description,
    imagePath,
    price,
    quantity: quantity,
    slug,
  };

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

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: '444cz5oj',
      dataset: 'production',
    });

    setImageUrl(imgBuilder.image(image));
  }, [image]);
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

  return (
    <>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <div className={styles.conteiner}>
        <div className={styles.content}>
          <div className={styles.mainImage}>
            {imageUrl && (
              <Image
                fill={true}
                style={{ objectFit: 'cover' }}
                src={imageUrl.toString()}
                alt='main bouquet image'
              ></Image>
            )}
          </div>
          <div className={styles.secondaryImagesConteiner}>
            <div className={styles.secondaryImage}>
              {imageUrl && (
                <Image
                  fill={true}
                  src={imageUrl.toString()}
                  style={{ objectFit: 'cover' }}
                  alt='bouquet image'
                ></Image>
              )}
            </div>
            <div className={styles.secondaryImage}>
              {imageUrl && (
                <Image
                  fill={true}
                  src={imageUrl.toString()}
                  style={{ objectFit: 'cover' }}
                  alt='bouquet image'
                ></Image>
              )}
            </div>
            <div className={styles.secondaryImage}>
              {imageUrl && (
                <Image
                  fill={true}
                  style={{ objectFit: 'cover' }}
                  src={imageUrl.toString()}
                  alt='bouquet image'
                ></Image>
              )}
            </div>
          </div>
          <div className={styles.infoConteiner}>
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
            {/* <BlockContent blocks={description} /> */}
          </div>
        </div>
        <Box sx={{ my: 'max(100px,5vw)', px: '10%' }}>
          <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
        </Box>
      </div>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const boucketSlug = pageContext.query.boucketSlug;
  // const categorySlug = pageContext.query.slug;

  if (!boucketSlug) {
    return {
      notFound: true,
    };
  }



  const query =`*[ _type == "bouquet" && slug.current == "${boucketSlug}" ]{
    _id,
    title,
    slug,
    images,
    price,
    description,
  }`


  const result = await sanityClient.fetch(query);
  const bouquet = result[0];


  const instagramUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`;
  const data = await fetch(instagramUrl);
  const instagramPosts = await data.json();

  if (!bouquet) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        description: bouquet.description.ru,
        title: bouquet.title.ru,
        image: bouquet.images[0],
        price: bouquet.price,
        slug: bouquet.slug,
        id: bouquet._id,
        instagramPosts: instagramPosts ? instagramPosts : [],
      },
    };
  }
};

export default Bouquet;
