import * as React from 'react';
import styles from './SimpleBouquetCard.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Link from '../../Link';
import heartIcon from '../../assets/icons/heart.svg';
import heartIconFill from '../../assets/icons/heartFill.svg';
import IconButton from '@mui/material/IconButton';
import Image from 'next/future/image';
import { useAppContext } from '../context/BouquetsContext';
import Zoom from '@mui/material/Zoom';
import { useEffect } from 'react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';

export default function SimpleBouquetCard({ id, title, imagePath, price, slug }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const bouckeList = useAppContext();

  const bouquet = { id, title, imagePath: imagePath, price, slug };
  const addToFavoritList = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    bouckeList.addOrRemoveToFavorite(bouquet);
  };
  // console.log(bouquet)

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
      {/* <IconButton
        sx={{zIndex:'2'}}
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
      </IconButton> */}
      <Zoom in={checked}>
        <Card
          sx={{
            width: '100%',
            maxWidth: '345px',
            height: '100%',
            bgcolor: 'fon.main',
            p:'0',
            // boxShadow: isHovered ? '0px 0px 15px 7px #00000012' : null,
          }}
          className={styles.card}
          elevation={0}
          // raised={true}
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
            href={`/catalog/${slug?.current}`}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '460px',
              }}
            >
              <Image
                layout='fill'
                fill={true}
                src={imagePath?.toString()}
                alt='Bouquet image'
              />
            </Box>

            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}
            >
              <Typography sx={{ textAlign:'center'}} variant='h5' component='p'>
                {title}
              </Typography>
              <Box
                mt='auto'
                width='100%'
                display='inline-flex'
                justifyContent='space-between'
              >
                {/* <Typography
                  gutterBottom
                  variant='h5'
                  component='p'
                  sx={{ fontWeight: 700, mt: 'auto' }}
                >
                  {price} руб.
                </Typography> */}
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Zoom>
    </div>
  );
}
