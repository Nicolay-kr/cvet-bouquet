import * as React from 'react';
import styles from './BouquetCard.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Link from '../CustopNextComponents/Link';
import heartIcon from '../../../public/assets/icons/heart.svg';
import heartIconFill from '../../../public/assets/icons/heartFill.svg';
import IconButton from '@mui/material/IconButton';
import Image from 'next/future/image';
import { useAppContext } from '../context/BouquetsContext';
import Zoom from '@mui/material/Zoom';
import { useEffect } from 'react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import { urlFor } from '../../../sanity';
import { NextSanityIMG } from '../CustopNextComponents/NextSanityIMG';

// import AspectRatio from '@mui/joy/AspectRatio';
// import { CssVarsProvider } from '@mui/joy/styles';

// npm install @mui/joy @emotion/react @emotion/styled

export default function BouquetCard({
  id,
  title,
  imagePath,
  price,
  slug,
  categorySlug = null,
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const bouckeList = useAppContext();
  // console.log(imagePath);
  const bouquet = {
    id,
    title,
    imagePath,
    price,
    slug,
    categorySlug,
  };
  const addToFavoritList = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    bouckeList.addOrRemoveToFavorite(bouquet);
  };

  useEffect(() => {
    setChecked(true);
    return () => {
      setChecked(false);
      // Clean up the subscription
      // subscription.unsubscribe();
    };
  });

  return (
    <div className={styles.cardConteiner}>
      <IconButton
        sx={{ zIndex: '2' }}
        onMouseOver={() => {
          setIsHovered(true);
        }}
        component='div'
        className={styles.cardHeart}
        href='#'
        onClick={addToFavoritList}
      >
        <Image
          src={
            bouckeList.favoriteBouquets.find((item) => item.id === id)
              ? heartIconFill
              : heartIcon
          }
          alt='heart icon'
        ></Image>
      </IconButton>
      <Zoom in={checked}>
        <Card
          sx={{
            width: '100%',
            // maxWidth: '345px',
            height: '100%',
            bgcolor: 'fon.main',
            boxShadow: isHovered ? '0px 0px 15px 7px #00000012' : null,
          }}
          className={styles.card}
          elevation={0}
          raised={true}
          onMouseOver={() => {
            setIsHovered(true);
          }}
          onMouseOut={() => {
            setIsHovered(false);
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              height: '100%',
            }}
            component={Link}
            noLinkStyle
            href={`/catalog/${categorySlug ? categorySlug + '/' : ''}${
              slug?.current
            }`}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                // height: '360px',
                aspectRatio: '3/4',
              }}
            >
              {imagePath ? (
                // <CssVarsProvider>
                //   <AspectRatio ratio='3/4'>
                <Image
                  layout='fill'
                  fill={true}
                  sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
                  src={urlFor(imagePath).width(500).url()}
                  alt='Bouquet image'
                />
              ) : // <NextSanityIMG image={imagePath}></NextSanityIMG>
              //</Box> </AspectRatio>
              // </CssVarsProvider>
              null}
            </Box>

            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}
            >
              <Typography gutterBottom variant='h5' component='p' >
                {title}
              </Typography>
              <Box
                mt='auto'
                width='100%'
                display='inline-flex'
                justifyContent='space-between'
              >
                <Typography
                  gutterBottom
                  variant='h5'
                  component='p'
                  sx={{ fontWeight: 700, mt: 'auto',}}
                >
                  {price} <sup style={{ fontSize: '12px' }}>BYN</sup>
                </Typography>
                <Typography gutterBottom variant='h5' component='p' sx={{fontSize:{xs:'10px',lg:'18px'},textAlign:'end',width:'50%' }}>
                  бесплатная доставка
                </Typography>
              </Box>
            </CardContent>
          </Box>
          <CardActions sx={{ padding: '0' }}>
            <AddToCartButton
              bouquet={{ ...bouquet, quantity: 1 }}
            ></AddToCartButton>
          </CardActions>
        </Card>
      </Zoom>
    </div>
  );
}
