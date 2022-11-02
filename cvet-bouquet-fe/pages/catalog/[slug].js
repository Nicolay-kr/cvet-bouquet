import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import styles from '../../styles/BouquetPage.module.css';
import BlockContent from '@sanity/block-content-to-react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CounterButtons from '../../src/components/CounterButtons';
import butttonHeart from '../../src/assets/icons/buttonHeart.svg';
import Image from 'next/future/image';
import { useAppContext } from '../../src/components/context/BouquetsContext';

export const Bouquet = ({ id, title, description, image, price }) => {
  const [imageUrl, setImageUrl] = useState('');

  const bouckeList = useAppContext();
  console.log(bouckeList)

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: '444cz5oj',
      dataset: 'production',
    });

    setImageUrl(imgBuilder.image(image));
  }, [image]);

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
          <CounterButtons id={id} value={1} isFlexSize={true}></CounterButtons>
          <div className={styles.buttons}>
            <Button sx={{ width: '100%' }} variant='contained' color='primary'>
              В корзину
            </Button>
            <Button sx={{ ml: 2.5 }} variant='contained' color='primary'>
              <Image className={styles.iconImage} src={butttonHeart} />
            </Button>
          </div>
        </div>
        <div className={styles.description}>
          <BlockContent blocks={description} />
        </div>
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
        id: bouquet.id,
      },
    };
  }
};

export default Bouquet;
