import React from 'react';
import { sanityClient } from '../../sanity';
import BouquetListPage from '../../src/components/BouquetListPage';
import Head from 'next/head';

export const Popular = ({ instagramPosts, bouquets, generalInfo }) => {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Каталог', href: '/catalog' },
    { title: 'Популярные букеты', href: null },
  ];

  return (
    <>
      <Head lang='ru'>
        <title>Популярные букеты | ЦВЕТ•БУКЕТ</title>
      </Head>
      <BouquetListPage
        breadCrumbsList={breadCrumbsList}
        instagramPosts={instagramPosts}
        category={[{ bouqets: bouquets, slug: { current: 'popular' } }]}
        generalInfo={generalInfo}
      ></BouquetListPage>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const query = `*[ _type == "mainPage"][0]
  {
    popularBouqets[]->{
      _id,
      title,
      slug,
      images,
      price,
      description,
      "delivery":*[_type == "generalInfo"][0]{deliveryPrice,deliveryMin},
      publishedAt,
    },
  }`;

  const generalInfoQuery = `*[ _type == "generalInfo"]
  {
    _id,
    deliveryPrice,
    deliveryMin,
  }`;

  const resultBouquet = await sanityClient.fetch(query);
  const generalInfo = await sanityClient.fetch(generalInfoQuery);

  const instagramUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`;
  const data = await fetch(instagramUrl);
  const instagramPosts = await data.json();

  if (!instagramPosts.data || !instagramPosts.data.length) {
    return {
      props: {
        bouquets: [],
      },
    };
  } else {
    return {
      props: {
        instagramPosts,
        bouquets: resultBouquet.popularBouqets,
        generalInfo: generalInfo[0],
      },
    };
  }
};
export default Popular;
