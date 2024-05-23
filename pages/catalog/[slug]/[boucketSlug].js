import Head from 'next/head';
import React from 'react';
import { sanityClient } from '../../../sanity';
import BouquetPage from '../../../src/components/BouquetPage/BouquetPage';
import { useRouter } from 'next/router';

export const Bouquet = ({ data }) => {
  let breadCrumbsList = [];
  const router = useRouter();
  const categoryTitleMap = { 'favorites': 'Избранное','cart':'Корзина' };
  const categoryTitle = categoryTitleMap[router.query.category]

  if ((categoryTitle||data?.category?.title) && router.query.category) {
    if(categoryTitle){
      breadCrumbsList = [
        { title: 'Главная', href: '/' },
        {
          title: categoryTitle || data?.category?.title,
          href: categoryTitle? `/${router.query.category}`:`/catalog/${router.query.category}`,
        },
        { title: data?.bouquet?.title?.ru, href: null },
      ];

    }else{
      breadCrumbsList = [
        { title: 'Главная', href: '/' },
        { title: 'Каталог', href: '/catalog' },
        {
          title: categoryTitle || data?.category?.title,
          href: categoryTitle? `/${router.query.category}`:`/catalog/${router.query.category}`,
        },
        { title: data?.bouquet?.title?.ru, href: null },
      ];

    }

  } else {
    breadCrumbsList = [
      { title: 'Главная', href: '/' },
      { title: 'Каталог', href: '/catalog' },
      { title: data?.bouquet?.title?.ru, href: null },
    ];
  }

  return (
    <>
      <Head>
        <title>{data?.bouquet?.title?.ru} | ЦВЕТ•БУКЕТ</title>
      </Head>

      <BouquetPage
        bouquet={{ ...data?.bouquet, title: data?.bouquet?.title?.ru }}
        breadCrumbsList={breadCrumbsList}
        generalInfo={data?.generalInfo}
      ></BouquetPage>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const boucketSlug = pageContext.query.boucketSlug;
  const categorySlug = pageContext.query.category;

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
