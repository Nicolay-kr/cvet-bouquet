import Head from 'next/head';
import React from 'react';
import { sanityClient } from '../../sanity';
import BouquetListPage from '../../src/components/BouquetListPage/BouquetListPage';

export const AllBouquetsPage = ({ data }) => {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Каталог', href: '/catalog' },
    { title: 'Все Букеты', href: null },
  ];

  return (
    <>
      <Head>
        <title>Все букеты | ЦВЕТ•БУКЕТ</title>
      </Head>
      <BouquetListPage
        breadCrumbsList={breadCrumbsList}
        category={[{ bouqets: data?.bouquets, slug: { current: 'products' } }]}
        generalInfo={data?.generalInfo} bouqets={data?.bouquets}      ></BouquetListPage>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const query = `{
    "bouquets":*[ _type == "bouquet"]{
      _id,
      title,
      slug,
      images,
      price,
      description,
      published,
      care,
      "delivery":*[_type == "generalInfo"][0]{deliveryPrice,deliveryMin},
      publishedAt,
    },
    "generalInfo":*[ _type == "generalInfo"][0]{
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
export default AllBouquetsPage;
