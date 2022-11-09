import React from 'react';
import styles from '../../styles/Catalog.module.css';
import imageUrlBuilder from '@sanity/image-url';
import BouquetCard from '../../src/components/BouquetCard/BouquetCard';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import InstagramBlock from '../../src/components/InstagramBlock/InstagramBlock';

export default function Home({ bouquets, instagramPosts }) {
  const [mappedBouquets, setMappedBouquets] = React.useState([]);

  React.useEffect(() => {
    if (bouquets.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: '444cz5oj',
        dataset: 'production',
      });

      setMappedBouquets(
        bouquets.map((p) => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.images[0]).width(720).height(900),
          };
        })
      );
    } else {
      setMappedBouquets([]);
    }
  }, [bouquets]);

  const orderedList = mappedBouquets?.sort((a,b)=>(a.order-b.order))

  return (
    <Box sx={{ width: '100%', px: '10%', my: 3 }}>
      <Box sx={{ width: '100%', mx: 'auto' }} className={styles.cardsContainer}>
        <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {mappedBouquets.length ? (
            orderedList.map(
              ({ _id, title, description, mainImage, price, slug }, index) => (
                <Grid xs={12} sm={6} md={4} xl={3} key={_id}>
                  <BouquetCard
                    id={_id}
                    title={title.ru}
                    price={price}
                    // description={description.ru}
                    imagePath={mainImage}
                    slug={slug}
                  ></BouquetCard>
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
  const query = encodeURIComponent('*[ _type == "bouquet" ]');
  const url = `https://444cz5oj.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  const instagramUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`
  const data = await fetch(instagramUrl)
  const instagramPosts = await data.json();

  if (!result.result || !result.result.length || !instagramPosts.data) {
    return {
      props: {
        bouquets: [],
      },
    };
  } else {
    console.log(result.result);
    return {
      props: {
        bouquets: result.result,
        instagramPosts,
      },
    };
  }
};
