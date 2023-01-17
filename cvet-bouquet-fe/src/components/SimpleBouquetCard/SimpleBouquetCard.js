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
import size from '../../utils/size';

export default function SimpleBouquetCard({
  id,
  title,
  imagePath,
  price,
  slug,
  isPremium = false,
  width = null,
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
    };
  });
  
  return (
    <div className={styles.cardConteiner} key={id}>
      <Fade in={checked}>
        <Card
          sx={{
            width: width ? width : '100%',
            height: '100%',
            bgcolor: 'fon.main',
            p: '0',
            borderRadius:'0',
          }}
          className={styles.card}
          elevation={0}
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
            href={`/catalog/${
              isPremium ? `premium-floristika/${slug?.current}` : slug?.current
            }`}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: width
                  ? { xs: '40vw', md: width.md*4/3, xl: width.xl*4/3, xxl: `${18.75*4/3}vw` }
                  : {
                      xs: '60vw',
                      md: '38vw',
                      lg: '25vw',
                    },
              }}
            >
              <Box
                component={Image}
                sx={{ objectFit: 'cover' }}
                layout='fill'
                fill={true}
                sizes='(max-width: 768px) 30vw, (max-width: 1200px) 50vw,
                33vw'
                src={urlFor(imagePath)?.width(400)?.url()}
                alt='Bouquet image'
              ></Box>
            </Box>

            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: '1',
                minHeight: '70px',
                px:isPremium?0:16,
              }}
            >
              <Typography
                sx={{ textAlign: {xs:isPremium?'left':'center',lg:'center'},fontSize:{...size(24),xs:14} }}
                variant='h4'
                component='p'
              >
                {title}
              </Typography>
              <Box
                mt='auto'
                width='100%'
                display='inline-flex'
                justifyContent='space-between'
              ></Box>
            </CardContent>
          </Box>
        </Card>
      </Fade>
    </div>
  );
}
