import * as React from 'react';
import styles from './BouquetCard.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Link from '../CustopNextComponents/Link';
import HeartIcon from '../../../public/assets/icons/heart.svg';
import HeartIconFill from '../../../public/assets/icons/heartFill.svg';
import IconButton from '@mui/material/IconButton';
import Image from 'next/future/image';
import { useAppContext } from '../context/BouquetsContext';
import Fade from '@mui/material/Fade';
import { useEffect } from 'react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import { urlFor } from '../../../sanity';
import size from '../../utils/size';
import { useRouter } from 'next/router';

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
  categoryName = null,
  deliveryPrice,
  deliveryMin,
  width = null,
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const bouckeList = useAppContext();
  const bouquet = {
    id,
    title,
    imagePath,
    price,
    slug,
    categorySlug,
    categoryName,
    deliveryPrice,
    deliveryMin,
  };
  const isInCart = bouckeList.bouquetsInCarts.find((item) => item.id === id)
    ? true
    : false;
  const router = useRouter();

  const addToFavoritList = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    bouckeList.addOrRemoveToFavorite(bouquet);
  };

  const addToCart = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    bouckeList.addToCart({
      ...bouquet,
      quantity: 1,
    });
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
    <Box
      className={styles.cardConteiner}
      sx={{
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
        transition: '0.3s',
        width: width ? width : '100%',
      }}
    >
      <IconButton
        sx={{
          zIndex: '2',
          p: size(10),
          position: 'absolute ',
          right: width ? '2%' : '10%',
          top: '4%',
          backgroundColor: '#F8F2EA !important',
        }}
        onMouseOver={() => {
          setIsHovered(true);
        }}
        component='div'
        onClick={addToFavoritList}
      >
        <Box sx={{
          width:{xs:24,lg:30},
          height:{xs:24,lg:30},
          }}>
        {bouckeList.favoriteBouquets.find((item) => item.id === id) ? (
          <HeartIconFill width={'100%'} height={'100%'} viewBox='-3 -3 30 30' />
        ) : (
          <HeartIcon width={'100%'} height={'100%'} viewBox='-3 -3 30 30'/>
        )}
        </Box>
      </IconButton>
      <Fade timeout={1000} in={checked}>
        <Card
          sx={{
            width: width ? width : '100%',
            height: '100%',
            bgcolor: 'fon.main',
            boxShadow: isHovered ? '0px 0px 15px 7px #00000012' : null,
            display: 'flex',
            flexDirection: 'column',
            p: '10px',
            transition: '0.3s',
          }}
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
            href={`/${categorySlug ? categorySlug + '/' : ''}${slug?.current}`}
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
                <Box
                  sx={{ objectFit: 'cover' }}
                  component={Image}
                  layout='fill'
                  fill={true}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw,
                  33vw'
                  src={urlFor(imagePath).width(400).url()}
                  alt='Bouquet image'
                ></Box>
              ) : // <NextSanityIMG image={imagePath}></NextSanityIMG>
              //</Box> </AspectRatio>
              // </CssVarsProvider>
              null}
            </Box>

            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: '1',
                px: '0px',
              }}
            >
              <Typography gutterBottom variant='h4' component='p'>
                {title}
              </Typography>
              <Box
                sx={{
                  mt: 'auto',
                  width: '100%',
                  display: 'inline-flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  gutterBottom
                  variant='h3'
                  component='p'
                  sx={{ fontWeight: 700, display: 'flex', mb: '0' }}
                >
                  {price}
                  <Box
                    component='sup'
                    style={{ fontSize: '0.5em', paddingTop: '4px' }}
                  >
                    BYN
                  </Box>
                </Typography>
                <Typography
                  gutterBottom
                  variant='h6'
                  component='p'
                  sx={{
                    textAlign: 'end',
                    width: '51%',
                    fontSize: { ...size(18), xs: 10 },
                  }}
                >
                  {bouquet.price >= deliveryMin ? (
                    <span>
                      бесплатная
                      <br />
                      доставка
                    </span>
                  ) : (
                    <span>
                      Доставка {deliveryPrice}
                      <Box
                        sx={{ fontSize: '0.5em', pt: size(4) }}
                        component='sup'
                      >
                        BYN
                      </Box>
                    </span>
                  )}
                </Typography>
              </Box>
            </CardContent>
          </Box>
          <CardActions sx={{ padding: '0', flexDirection: 'column' }}>
            <AddToCartButton
              isInCart={isInCart}
              bouquet={{ ...bouquet, quantity: 1 }}
            ></AddToCartButton>
            <Box sx={{ height: size(80), width: '100%' }}>
              {isHovered ? (
                <Typography
                  variant='h5'
                  onClick={(e) => {
                    addToCart(e);
                    router.push({
                      pathname: '/cart',
                      query: { isCheckout: true },
                    });
                  }}
                  sx={{
                    py: size(30),
                    textDecoration: 'underline',
                    color: 'primary.main',
                    textAlign: 'center',
                  }}
                >
                  Быстрый заказ
                </Typography>
              ) : null}
            </Box>
          </CardActions>
        </Card>
      </Fade>
    </Box>
  );
}
