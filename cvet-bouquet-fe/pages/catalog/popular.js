import React from 'react';
import { sanityClient } from '../../sanity';
import BouquetListPage from '../../src/components/BouquetListPage/BouquetListPage';
import Head from 'next/head';

export const Popular = ({ data }) => {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Каталог', href: '/catalog' },
    { title: 'Популярные букеты', href: null },
  ];

  return (
    <>
      <Head>
        <title>Популярные букеты | ЦВЕТ•БУКЕТ</title>
      </Head>
      <BouquetListPage
        breadCrumbsList={breadCrumbsList}
        category={[{ bouqets: data?.popularBouqets, slug: { current: 'popular' } }]}
        generalInfo={data?.generalInfo}
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
    "generalInfo":*[ _type == "generalInfo"]
    {
      _id,
      deliveryPrice,
      deliveryMin,
    }
  }`;


  const data = await sanityClient.fetch(query);

  if (!data) {
    return {
      props: {
        bouquets: {},
      },
    };
  } else {
    return {
      props: {
        data,
      },
    };
  }
};
export default Popular;
