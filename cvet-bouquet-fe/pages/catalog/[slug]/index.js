import React from 'react';
import { sanityClient } from '../../../sanity';
import BouquetListPage from '../../../src/components/BouquetListPage';
// import { useState } from 'react';

export const CategoryBouquets = ({ category, instagramPosts }) => {
  const breadCrumbsList = [
    { title: 'Главаная', href: '/' },
    { title: 'Каталог', href: '/catalog' },
    { title: category[0].title, href: null },
  ];
  console.log(category)

  return (
    <BouquetListPage
      breadCrumbsList={breadCrumbsList}
      instagramPosts={instagramPosts}
      category={category}
    ></BouquetListPage>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  const queryCategory = `*[ _type == "category" && slug.current == "${pageSlug}"]
  {
    _id,
    slug,
    title,
    mainImage,
    data,
    bouqets[]->{
      _id,
      title,
      slug,
      images,
      price,
      description,
    },
  }`;

  const resultCategory = await sanityClient.fetch(queryCategory);

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
        category: resultCategory,
      },
    };
  }
};
export default CategoryBouquets;
