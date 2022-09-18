import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import styles from '../../styles/Bouquet.module.css';
import BlockContent from '@sanity/block-content-to-react';
import {Toolbar} from '../../components/Toollbar'

export const Bouquet = ({ title, description, image }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: '444cz5oj',
      dataset: 'production',
    });

    setImageUrl(imgBuilder.image(image));
  }, [image]);

  return (
    <div>
      <Toolbar />
      <div className={styles.main}>
        <h1>{title}</h1>
        {imageUrl && <img className={styles.mainImage} src={imageUrl} />}

        <div className={styles.description}>
          <BlockContent blocks={description} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async pageContext => {
  const pageSlug = pageContext.query.slug;
  
  if (!pageSlug) {
    return {
      notFound: true
    }
  }

  const query = encodeURIComponent(`*[ _type == "bouquet" && slug.current == "${pageSlug}" ]`);
  const url = `https://444cz5oj.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then(res => res.json());
  const bouquet = result.result[0];

  if (!bouquet) {
    return {
      notFound: true
    }
  } else {
    return {
      props: {
        description: bouquet.description.ru,
        title: bouquet.title.ru,
        image: bouquet.mainImage,
      }
    }
  }
};

export default Bouquet;