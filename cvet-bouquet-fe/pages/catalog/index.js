import React, { useEffect } from 'react';
import styles from '../../styles/Catalog.module.css';
import imageUrlBuilder from '@sanity/image-url';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import InstagramBlock from '../../src/components/InstagramBlock/InstagramBlock';
import { sanityClient } from '../../sanity';
import SimpleBouquetCard from '../../src/components/SimpleBouquetCard/SimpleBouquetCard';

export default function Home({ category, instagramPosts }) {
  const [mappedBouquets, setMappedBouquets] = React.useState([]);

  useEffect(() => {
    if (category?.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: '444cz5oj',
        dataset: 'production',
      });

      setMappedBouquets(
        category.map((p) => {
          return {
            ...p,
            bouqets: p.bouqets.map(bouqet=>{
              return {
                ...bouqet,
                images: bouqet.images.map(image=>imgBuilder.image(image).width(720).height(900)),

              }
            }
            ),
            mainImage: imgBuilder.image(p.mainImage).width(720).height(900),
          };
        })
      );
    } else {
      setMappedBouquets([]);
    }
  }, [category]);

  const orderedList = mappedBouquets?.sort((a,b)=>(a.order-b.order))

  return (
    <Box sx={{ width: '100%', px: '10%', my: '40px' }}>
      <Box sx={{ width: '100%', mx: 'auto' }} className={styles.cardsContainer}>
        <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {mappedBouquets.length ? (
            orderedList.map(
              ({ _id, title, description, mainImage, price, slug }, index) => (
                <Grid xs={12} sm={6} md={4} xl={3} key={_id}>
                  <SimpleBouquetCard
                    id={_id}
                    title={title}
                    imagePath={mainImage}
                    slug={slug}
                    price={null}
                  ></SimpleBouquetCard>
                </Grid>
              )
            )
          ) : (
            <>No Posts Yet</>
          )}
        </Grid>
      </Box>
      {/* <div className={styles.feed}>
          {mappedBouquets.length ? (
            mappedBouquets.map(({ title, description, mainImage }, index) => (
              <BouquetCard
                title={title.ru}
                // description={description.ru}
                imagePath={mainImage}
              ></BouquetCard>
            ))
          ) : (
            <>No Posts Yet</>
          )}
        </div> */}
        <Box sx={{my:'max(100px,5vw)'}}>
        <InstagramBlock instagramPosts={instagramPosts} />

        </Box>
    </Box>
  );
}

export const getServerSideProps = async (pageContext) => {
  const queryCategory = `*[ _type == "category"]
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
