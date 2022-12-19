import Head from 'next/head';
import React from 'react';
import { sanityClient } from '../../../sanity';
import BouquetPage from '../../../src/components/bouquePage/BouquetPage';

export const Bouquet = ({ data }) => {
  let breadCrumbsList = [];

  if (data.category && data?.category?.title) {
    breadCrumbsList = [
      { title: 'Главная', href: '/' },
      { title: 'Каталог', href: '/catalog' },
      {
        title: data.category.title,
        href: `/catalog/${data?.category.slug.current}`,
      },
      { title: data?.bouquet.title.ru, href: null },
    ];
  } else {
    breadCrumbsList = [
      { title: 'Главная', href: '/' },
      { title: 'Каталог', href: '/catalog' },
      { title: data?.bouquet.title.ru, href: null },
    ];
  }

  return (
    <>
      <Head lang='ru'>
        <title>{data?.bouquet.title.ru} | ЦВЕТ•БУКЕТ</title>
      </Head>

      <BouquetPage
        bouquet={{ ...data?.bouquet, title: data?.bouquet.title.ru }}
        breadCrumbsList={breadCrumbsList}
        generalInfo={data?.generalInfo}
      ></BouquetPage>
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

  const query = `{
    "bouquet" : *[ _type == "bouquet" && slug.current == "${boucketSlug}" ][0]{
      _id,
      title,
      slug,
      images,
      price,
      description,
      care,
      delivery->,
    },
    "category":*[ _type == "category" && slug.current == "${categorySlug}"][0]
    {
      _id,
      slug,
      title,
    },
    "generalInfo":*[ _type == "generalInfo"][0]
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
        data: {},
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

export default Bouquet;
