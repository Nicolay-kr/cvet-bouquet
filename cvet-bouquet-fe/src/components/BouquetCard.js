import * as React from 'react';
import styles from '../../styles/BouquetCard.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '../../src/Link';

export default function BouquetCard({ id, title, imagePath, price, slug }) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <Card
      sx={{ width: '100%', maxWidth: 345, height: '100%', bgcolor: 'fon.main' }}
      className={styles.cardConteiner}
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
          <Typography
            gutterBottom
            variant='h5'
            component='p'
            sx={{ fontWeight: 700 }}
          >
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
          variant={isHovered ? 'contained' : 'outlined'}
          color='primary'
          sx={{ width: '100%', height: '60px' }}
        >
          В корзину
        </Button>
      </CardActions>
    </Card>
  );
}
