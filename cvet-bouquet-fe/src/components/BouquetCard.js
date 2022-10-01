import * as React from 'react';
import styles from '../../styles/BouquetCard.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '../../src/Link';

export default function BouquetCard({ title, imagePath, price, slug }) {
  return (
    <Card
      // sx={{ width:'100%', maxWidth: 345, height: '100%' }}
      width='100%'
      // sx={{ width: { xs: 164, sm: 300, md: 340 }, height: '100%' }}
      className={styles.cardConteiner}
    >
      {/* <CardActionArea > */}
      <CardMedia
        component='img'
        height='360'
        image={imagePath.toString()}
        alt='Bouquet image'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='p'>
          {title}
        </Typography>
        <Box width='100%' display='inline-flex' justifyContent='space-between'>
          <Typography gutterBottom variant='h5' component='p'>
            {price} руб.
          </Typography>
          <Typography gutterBottom variant='h5' component='p'>
            с доставкой
          </Typography>
        </Box>
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions sx={{ marginTop: 'auto', padding: '0' }}>
        <Button
          variant='outlined'
          color='primary'
          sx={{ width: '100%' }}
          component={Link}
          noLinkStyle
          href={`/catalog/${slug.current}`}
        >
          Оформить заказ
        </Button>
      </CardActions>
    </Card>
  );
}
