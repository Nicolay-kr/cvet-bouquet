import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppContext } from './context/BouquetsContext';

export default function CounterButtons({ id, value}) {
  const bouckeList = useAppContext();
  const handleIncrease = (e) => {
    bouckeList.icreaseQuantity(id);
  };
  const handlDecrease = (e) => {
    bouckeList.decreaseQuantity(id);
  };
  return (
    <ButtonGroup
      sx={{ border: '1px solid', opacity: '0.7', height: 'max(40px,2.1vw)' }}
      aria-label='Disabled elevation buttons'
    >
      <Button
        onClick={handlDecrease}
        sx={{ fontSize: '24px', width: 'max(60px,3.1vw)' }}
        variant='text'
      >
        -
      </Button>
      <Typography
        sx={{ mb: '0', alignSelf: 'center', width: 'max(30px,1.5vw)' }}
        gutterBottom
        variant='h4'
        component='span'
      >
        {value}
      </Typography>
      <Button
        onClick={handleIncrease}
        sx={{ fontSize: '24px', width: 'max(60px,3.1vw)' }}
        variant='text'
      >
        +
      </Button>
    </ButtonGroup>
  );
}
