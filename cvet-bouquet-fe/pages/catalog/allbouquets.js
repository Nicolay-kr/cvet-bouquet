import Head from 'next/head';
import React from 'react';
import { sanityClient } from '../../sanity';
import BouquetListPage from '../../src/components/BouquetListPage';

export const AllBouquetsPage = ({ instagramPosts, bouquets, generalInfo }) => {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Каталог', href: '/catalog' },
    { title: 'Все Букеты', href: null },
  ];

  return (
    <>
      <Head lang='ru'>
        <title>Все букеты | cvetbuket.by</title>
      </Head>
      <BouquetListPage
        breadCrumbsList={breadCrumbsList}
        instagramPosts={instagramPosts}
        category={[{ bouqets: bouquets, slug: { current: 'allbouquets' } }]}
        generalInfo={generalInfo}
      ></BouquetListPage>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  // const pageSlug = pageContext.query.slug;
  const queryBouquet = `*[ _type == "bouquet"]
  {
      _id,
      title,
      slug,
      images,
      price,
      description,
      care,
      "delivery":*[_type == "generalInfo"][0]{deliveryPrice,deliveryMin},
      publishedAt,

  }`;

  const generalInfoQuery = `*[ _type == "generalInfo"]
  {
    _id,
    deliveryPrice,
    deliveryMin,
  }`;

  const resultBouquet = await sanityClient.fetch(queryBouquet);
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
        bouquets: resultBouquet,
        generalInfo: generalInfo[0],
      },
    };
  }
};
export default AllBouquetsPage;
