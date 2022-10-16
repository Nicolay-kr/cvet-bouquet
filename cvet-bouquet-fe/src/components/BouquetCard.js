import * as React from 'react';
import styles from '../../styles/BouquetCard.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '../../src/Link';
import heartIcon from '../assets/icons/heart.svg';
import heartIconFill from '../assets/icons/heartFill.svg';
import IconButton from '@mui/material/IconButton';
import Image from 'next/future/image';
import { useAppContext } from './context/HeartContext';

export default function BouquetCard({ id, title, imagePath, price, slug }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const bouckeList = useAppContext();
  console.log(bouckeList)
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
  const addToCart = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    bouckeList.addOrRemoveToCart({
      id,
      title,
      imagePath: imagePath.toString(),
      price,
      slug,
    });
  };
  return (
    <div className={styles.cardConteiner}>
      <IconButton
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
      <Card
        sx={{
          width: '100%',
          maxWidth: '345px',
          height: '100%',
          bgcolor: 'fon.main',
        }}
        className={styles.card}
        elevation={isHovered ? 10 : 0}
        raised={true}
        onMouseOver={() => {
          setIsHovered(true);
        }}
        onMouseOut={() => {
          setIsHovered(false);
        }}
        component={Link}
        href={`/catalog/${slug.current}`}
        noLinkStyle
      >
        <CardMedia
          component='img'
          height='360'
          image={imagePath.toString()}
          alt='Bouquet image'
        />
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
        {/* </CardActionArea> */}
        <CardActions sx={{ padding: '0' }}>
          <Button
            variant={isHovered ? 'contained' : 'outlined'}
            color='primary'
            sx={{ width: '100%', height: '60px' }}
            onClick={addToCart}
          >
            В корзину
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
