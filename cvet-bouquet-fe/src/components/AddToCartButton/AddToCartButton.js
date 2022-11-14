import * as React from 'react';
import Button from '@mui/material/Button';
import { useAppContext } from '../context/BouquetsContext';
import Snackbar from '@mui/material/Snackbar';

export default function AddToCartButton({ bouquet,variant='outlined' }) {
  const { id, title, imagePath, price, slug, quantity,categorySlug } = bouquet;
  const [isOpenSnack, setIsOpenSnack] = React.useState(false);
  const bouckeList = useAppContext();
  const addToCart = (e) => {
    setIsOpenSnack(true);
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    bouckeList.addToCart({
      id,
      title,
      imagePath: imagePath?.toString(),
      price,
      slug,
      quantity,
      categorySlug,
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
        variant= {variant}
        color='primary'
        sx={{
          width: '100%',
          height: '60px',
          borderWidth: '1.5px',
          '&:hover': { backgroundColor: 'primary.main', color: '#fff' },
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
