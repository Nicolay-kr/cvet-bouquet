import * as React from 'react';
import Button from '@mui/material/Button';
import { useAppContext } from '../context/BouquetsContext';
import Snackbar from '@mui/material/Snackbar';
import size from '../../utils/size';

export default function AddToCartButton({
  bouquet,
  variant = 'outlined',
  autoHeight = false,
  isInCart = false,
}) {
  const {
    id,
    title,
    imagePath,
    price,
    slug,
    quantity,
    categorySlug,
    deliveryPrice,
    deliveryMin,
  } = bouquet;
  const [isOpenSnack, setIsOpenSnack] = React.useState(false);
  const bouckeList = useAppContext();
  const addToCart = (e) => {
    setIsOpenSnack(true);
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    bouckeList.addToCart({
      id,
      title,
      imagePath: imagePath,
      price,
      slug,
      quantity,
      categorySlug,
      deliveryPrice,
      deliveryMin,
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenSnack(false);
  };

  return (
    <>
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
      <Button
        variant={variant}
        color='primary'
        sx={{
          width: '100%',
          height: autoHeight ? 'auto' : { ...size(60),xs:36 },
          borderWidth: '1.5px',
          fontSize:{...size(24), xs:'16px'},
          '&:hover': {
            backgroundColor: isInCart ? 'transparent' : 'primary.main',
            color: isInCart ? 'primary.main' : '#fff',
          },
        }}
        onClick={addToCart}
      >
        {bouckeList.bouquetsInCarts.find((item) => item.id === id)
          ? 'В корзине'
          : 'В корзину'}
      </Button>
    </>
  );
}
