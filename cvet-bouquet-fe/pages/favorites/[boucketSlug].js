import React from 'react';
import { sanityClient } from '../../sanity';
import BouquetPage from '../../src/components/bouquePage/BouquetPage';

export const Bouquet = ({
  id,
  title,
  description,
  images,
  price,
  slug,
  instagramPosts,
  category,
}) => {

  const breadCrumbsList = [
    { title: 'Главаная', href: '/' },
    { title: 'Избранное', href: '/favorites' },
    { title: title, href: null },
  ];

  return (
    <BouquetPage
      bouquet={{
        id,
        title,
        description,
        images,
        price,
        slug,
        instagramPosts,
        category,
      }}
      breadCrumbsList={breadCrumbsList}
      instagramPosts={instagramPosts}
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
    }`;

  const queryCategory = `*[ _type == "category" && slug.current == "${categorySlug}"]
    {
      _id,
      slug,
      title,
    }`;

  const resultCategory = await sanityClient.fetch(queryCategory);
  const result = await sanityClient.fetch(query);
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
        description: bouquet.description.ru,
        title: bouquet.title.ru,
        images: bouquet.images,
        price: bouquet.price,
        slug: bouquet.slug,
        id: bouquet._id,
        instagramPosts: instagramPosts ? instagramPosts : [],
        category: resultCategory,
      },
    };
  }
};

export default Bouquet;
