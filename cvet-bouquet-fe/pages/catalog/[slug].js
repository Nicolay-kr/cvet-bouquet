import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import styles from '../../styles/BouquetPage.module.css';
import BlockContent from '@sanity/block-content-to-react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CounterButtons from '../../src/components/CounterButtons/CounterButtons';
import butttonHeart from '../../src/assets/icons/buttonHeart.svg';
import Image from 'next/future/image';
import AccordionCustom from '../../src/components/AccordionCustom/AccordionCustom';
import AddToCartButton from '../../src/components/AddToCartButton/AddToCartButton';


export const Bouquet = ({ id, title, description, image, price,slug }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [quantity, setQuantity] = useState(1);
  const imgBuilder = imageUrlBuilder({
    projectId: '444cz5oj',
    dataset: 'production',
  });
  const imagePath =  imgBuilder.image(image).width(720).height(900);
  const bouquet = { id, title, description, imagePath:imagePath?.toString(), price, quantity:quantity,slug };

  const handlePlus = () => {
    setQuantity((state) => state + 1);
  };
  const handleMinus = () => {
    setQuantity((state) => (state > 1 ? state - 1 : 1));
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

  return (
    <div className={styles.conteiner}>
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
            ></AddToCartButton>
            <Button sx={{ ml: 2.5 }} variant='contained' color='primary'>
              <Image
                className={styles.iconImage}
                src={butttonHeart}
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
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = encodeURIComponent(
    `*[ _type == "bouquet" && slug.current == "${pageSlug}" ]`
  );
  const url = `https://444cz5oj.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());
  const bouquet = result.result[0];

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
      },
    };
  }
};

export default Bouquet;
