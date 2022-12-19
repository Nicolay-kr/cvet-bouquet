import Head from 'next/head';
import React from 'react';
import { sanityClient } from '../../sanity';
import BouquetListPage from '../../src/components/BouquetListPage';

export const AllBouquetsPage = ({ instagramPosts, data }) => {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Каталог', href: '/catalog' },
    { title: 'Все Букеты', href: null },
  ];

  return (
    <>
      <Head lang='ru'>
        <title>Все букеты | ЦВЕТ•БУКЕТ</title>
      </Head>
      <BouquetListPage
        breadCrumbsList={breadCrumbsList}
        instagramPosts={instagramPosts}
        category={[{ bouqets: data?.bouquets, slug: { current: 'allbouquets' } }]}
        generalInfo={data?.generalInfo}
      ></BouquetListPage>
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

  const instagramUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`;
  const dataInst = await fetch(instagramUrl);
  const instagramPosts = await dataInst.json();

  if (!data) {
    return {
      props: {
        bouquets: {},
      },
    };
  } else {
    return {
      props: {
        instagramPosts,
        data,
      },
    };
  }
};
export default AllBouquetsPage;
