import Head from 'next/head';
import React from 'react';
import { sanityClient } from '../../../sanity';
import BouquetPage from '../../../src/components/bouquePage/BouquetPage';

export const Bouquet = ({ bouquet, instagramPosts, category, generalInfo }) => {
  let breadCrumbsList = [];

  if (category && category?.title) {
    breadCrumbsList = [
      { title: 'Главная', href: '/' },
      { title: 'Каталог', href: '/catalog' },
      {
        title: category.title,
        href: `/catalog/${category.slug.current}`,
      },
      { title: bouquet.title.ru, href: null },
    ];
  } else {
    breadCrumbsList = [
      { title: 'Главная', href: '/' },
      { title: 'Каталог', href: '/catalog' },
      { title: bouquet.title.ru, href: null },
    ];
  }

  return (
    <>
      <Head lang='ru'>
        <title>{bouquet.title.ru} | ЦВЕТ•БУКЕТ</title>
      </Head>

      <BouquetPage
        bouquet={{ ...bouquet, title: bouquet.title.ru }}
        breadCrumbsList={breadCrumbsList}
        instagramPosts={instagramPosts}
        generalInfo={generalInfo}
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

  const query = `*[ _type == "bouquet" && slug.current == "${boucketSlug}" ]{
      _id,
      title,
      slug,
      images,
      price,
      description,
      care,
      delivery->
     
    }`;

  const queryCategory = `*[ _type == "category" && slug.current == "${categorySlug}"]
    {
      _id,
      slug,
      title,
    }`;

  const generalInfoQuery = `*[ _type == "generalInfo"][0]
    {
      _id,
      deliveryPrice,
      deliveryMin,
    }`;

  const resultCategory = await sanityClient.fetch(queryCategory);
  const result = await sanityClient.fetch(query);
  const generalInfo = await sanityClient.fetch(generalInfoQuery);
  const bouquet = result[0];

  const instagramUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`;
  const data = await fetch(instagramUrl);
  const instagramPosts = await data.json();

  if (!result) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        bouquet: bouquet,
        instagramPosts: instagramPosts ? instagramPosts : [],
        category:
          categorySlug === 'popular'
            ? { title: 'Популярные букеты', slug: { current: 'popular' } }
            : resultCategory,
        generalInfo: generalInfo,
      },
    };
  }
};

export default Bouquet;
