import React from 'react';
import styles from '../../../styles/BouquetPage.module.css';
import Box from '@mui/material/Box';
import InstagramBlock from '../../../src/components/InstagramBlock/InstagramBlock';
import { sanityClient } from '../../../sanity';
import BouquetCard from '../../../src/components/BouquetCard/BouquetCard';
import BreadCrumbs from '../../../src/components/breadcrubs/BreadCrumbs';

export const CategoryBouquets = ({ category, instagramPosts }) => {
  const breadCrumbsList = [
    { title: 'Главаная', href: '/' },
    { title: 'Каталог', href: '/catalog' },
    { title: category[0].title, href: null },
  ];
  return (
    <>
      <BreadCrumbs breadCrumbsList={breadCrumbsList}></BreadCrumbs>
      <Box sx={{ width: '100%', px: '10%', my: 3 }}>
        <Box
          sx={{ width: '100%', mx: 'auto' }}
          className={styles.cardsContainer}
        >
          {/* <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                lg: '1fr 1fr 1fr',
                xl: '1fr 1fr 1fr 1fr',
              },
              columnGap: 'max(30px, 1.5vw)',
              rowGap: 'max(30px, 1.5vw)',
            }}
          >
            {category.length ? (
              category[0]?.bouqets?.map(
                ({ _id, title, description, images, price, slug }, index) => (
                  // <Grid xs={12} sm={6} md={4} xl={3} key={_id}>
                  // <Box xs={12} sm={6} md={4} xl={3} key={_id}>
                  <Box key={_id}>
                  <BouquetCard
                    id={_id}
                    title={title.ru}
                    imagePath={images[0]}
                    slug={slug}
                    categorySlug={`catalog/${category[0].slug.current}`}
                    price={price}
                  ></BouquetCard>
                  </Box>
                )
              )
            ) : (
              <>No Bouqets Yet</>
            )}
          </Box>
        </Box>
        <Box sx={{ my: 'max(100px,5vw)' }}>
          <InstagramBlock instagramPosts={instagramPosts} />
        </Box>
      </Box>
    </>
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
