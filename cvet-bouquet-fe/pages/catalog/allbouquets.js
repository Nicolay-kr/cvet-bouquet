import React from 'react';
import { sanityClient } from '../../sanity';
import BouquetListPage from '../../src/components/BouquetListPage';

export const AllBouquetsPage = ({instagramPosts, bouquets}) => {
  const breadCrumbsList = [
    { title: 'Главаная', href: '/' },
    { title: 'Каталог', href: '/catalog' },
    { title: 'Все Букеты', href: null },
  ];


  return (
    <BouquetListPage
      breadCrumbsList={breadCrumbsList}
      instagramPosts={instagramPosts}
      category={[{bouqets:bouquets,slug:{current:'allbouquets'}}]}
    ></BouquetListPage>
  )
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  const queryBouquet = `*[ _type == "bouquet"]
  {
      _id,
      title,
      slug,
      images,
      price,
      description,
      care,
      delivery->,
  }`;

  const resultBouquet = await sanityClient.fetch(queryBouquet);

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
      },
    };
  }
};
export default AllBouquetsPage;
