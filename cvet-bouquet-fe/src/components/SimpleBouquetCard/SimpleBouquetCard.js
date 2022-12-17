import * as React from 'react';
import styles from './SimpleBouquetCard.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../CustopNextComponents/Link';
import Image from 'next/future/image';
import { useAppContext } from '../context/BouquetsContext';
import Fade from '@mui/material/Fade';
import { useEffect } from 'react';

import { urlFor } from '../../../sanity';


export default function SimpleBouquetCard({
  id,
  title,
  imagePath,
  price,
  slug,
  isPremium=false,
  width=null
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const bouckeList = useAppContext();

  const bouquet = { id, title, imagePath: imagePath, price, slug };
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
    <div className={styles.cardConteiner} key={id}>
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
      <Fade in={checked}>
        <Card
          sx={{
            width: width? width:'100%',
            // maxWidth: '345px',
            height: '100%',
            bgcolor: 'fon.main',
            p: '0',
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
            href={`/catalog/${isPremium? `premium-floristika/${slug?.current}`:slug?.current}`}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                // height: '360px',
                aspectRatio: '3/4',
              }}
            >
              <Box
                component={Image}
                sx={{ objectFit: 'cover' }}
                layout='fill'
                fill={true}
                widths='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
                src={urlFor(imagePath).width(400).url()}
                alt='Bouquet image'
              ></Box>
              {/* <NextSanityIMG image={imagePath}></NextSanityIMG> */}
            </Box>

            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1',minHeight:'70px'}}
            >
              <Typography
                sx={{ textAlign: 'center' }}
                variant='h5'
                component='p'
              >
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
      </Fade>
    </div>
  );
}
