import React from 'react'
import styles from '../styles/Home.module.css'
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import IntroBlock from '../src/components/IntroBlock/IntroBlock';

export default function Home({ bouquets }) {
  const router = useRouter();
  const [mappedBouquets, setMappedBouquets] = useState([]);

  useEffect(() => {
    if (bouquets.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: '444cz5oj',
        dataset: 'production',
      });

      setMappedBouquets(
        bouquets.map(p => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          }
        })
      );
    } else {
      setMappedBouquets([]);
    }
  }, [bouquets]);

  return (
    <>
    <IntroBlock></IntroBlock>
    </>
    // <div>
    //   <div className={styles.main}>
    //     <div className={styles.feed}>
    //       {mappedBouquets.length ? mappedBouquets.map((p, index) => (
    //         <div onClick={() => router.push(`/catalog/${p.slug.current}`)} key={index} className={styles.post}>
    //           <h3>{p.title.ru}</h3>
    //           <img className={styles.mainImage} src={p.mainImage} />
    //         </div>
    //       )) : <>No Posts Yet</>}
    //     </div>
    //   </div>
    // </div>
  );
}

export const getServerSideProps = async pageContext => {
  const query = encodeURIComponent('*[ _type == "bouquet" ]');
  const url = `https://444cz5oj.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then(res => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        bouquets: [],
      }
    }
  } else {
    return {
      props: {
        bouquets: result.result,
      }
    }
  }
};