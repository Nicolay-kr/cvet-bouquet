import React from 'react';
import { sanityClient } from '../../sanity';
import BouquetPage from '../../src/components/bouquePage/BouquetPage';

export const Bouquet = ({ bouquet, instagramPosts,generalInfo }) => {
  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Избранное', href: '/favorites' },
    { title: bouquet.title.ru, href: null },
  ];

  return (
    <BouquetPage
      bouquet={{ ...bouquet, title: bouquet.title.ru }}
      breadCrumbsList={breadCrumbsList}
      instagramPosts={instagramPosts}
      generalInfo={generalInfo}
    ></BouquetPage>
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
      delivery->,
    }`;

  const queryCategory = `*[ _type == "category" && slug.current == "${categorySlug}"]
    {
      _id,
      slug,
      title,
    }`;

    const generalInfoQuery = `*[ _type == "generalInfo"]
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
        category: resultCategory,
        generalInfo: generalInfo[0],
      },
    };
  }
};

export default Bouquet;
