import * as React from 'react';
import styles from '../../styles/BouquetCard.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '../../src/Link';
import heartIcon from '../assets/icons/heart.svg';
import heartIconFill from '../assets/icons/heartFill.svg';
import IconButton from '@mui/material/IconButton';
import Image from 'next/future/image';
import { useAppContext } from './context/BouquetsContext';
import Snackbar from '@mui/material/Snackbar';
import Zoom from '@mui/material/Zoom';
import { useEffect } from 'react';

export default function BouquetCard({ id, title, imagePath, price, slug }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isOpenSnack, setIsOpenSnack] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const bouckeList = useAppContext();
  const addToFavoritList = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    bouckeList.addOrRemoveToFavorite({
      id,
      title,
      imagePath: imagePath.toString(),
      price,
      slug,
    });
  };
  // console.log(imagePath)

  const addToCart = (e) => {
    setIsOpenSnack(true);
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    bouckeList.addToCart({
      id,
      title,
      imagePath: imagePath.toString(),
      price,
      slug,
      quantity: 1,
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpenSnack(false);
  };

  useEffect(() => {
    setChecked(true);
    return () => {
      setChecked(false);
      // Clean up the subscription
      // subscription.unsubscribe();
    };
  });
  console.log(imagePath.toString());
  return (
    <div className={styles.cardConteiner}>
      <div>
        <Snackbar
          // sx={{ background: 'primary.main' }}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isOpenSnack}
          message='Букет добавлен в корзину'
          onClose={handleCloseSnackbar}
        />
      </div>
      <IconButton
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
            maxWidth: '345px',
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
            href={`/catalog/${slug.current}`}
          >
            <Box sx={{
              position:'relative',
              width:'100%',
              height: '360px',
            }}>
            <Image
              layout='fill'
              fill={true}
              src={imagePath.toString()}
              alt='Bouquet image'
            />
            </Box>
           
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}
            >
              <Typography gutterBottom variant='h5' component='p'>
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
                  sx={{ fontWeight: 700, mt: 'auto' }}
                >
                  {price} руб.
                </Typography>
                <Typography gutterBottom variant='h5' component='p'>
                  с доставкой
                </Typography>
              </Box>
            </CardContent>
          </Box>
          <CardActions sx={{ padding: '0' }}>
            <Button
              variant={'outlined'}
              color='primary'
              sx={{ width: '100%', height: '60px', borderWidth: '1.5px','&:hover':{backgroundColor:'primary.main', color:'#fff'} }}
              onClick={addToCart}
            >
              {bouckeList.bouquetsInCarts.find((item) => item.id === id)
                ? 'В корзине'
                : 'В корзину'}
            </Button>
          </CardActions>
        </Card>
      </Zoom>
    </div>
  );
}
