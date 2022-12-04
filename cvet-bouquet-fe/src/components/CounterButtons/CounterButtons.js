import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppContext } from '../context/BouquetsContext';

export default function CounterButtons({
  id,
  value,
  isFlexSize = false,
  customHandlers = null,
}) {
  const bouckeList = useAppContext();
  const handleIncrease = (e) => {
    if (customHandlers?.plus) {
      customHandlers.plus();
    } else {
      bouckeList.icreaseQuantity(id);
    }
  };
  const handlDecrease = (e) => {
    if (customHandlers?.minus) {
      customHandlers.minus();
    } else {
      bouckeList.decreaseQuantity(id);
    }
  };
  return (
    <ButtonGroup
      sx={{
        border: '1px solid #000000',
        opacity: '0.7',
        height: isFlexSize ? '100%' : 'max(40px,2.1vw)',
        width: '100%',
        maxWidth: '250px',
      }}
      aria-label='Disabled elevation buttons'
    >
      <Button
        onClick={handlDecrease}
        sx={{ fontSize: '24px', width: isFlexSize ? '40%' : 'max(60px,3.1vw)' }}
        variant='text'
      >
        -
      </Button>
      <Typography
        sx={{
          mb: '0',
          alignSelf: 'center',
          width: isFlexSize ? '20%' : 'max(30px,1.5vw)',
          textAlign: 'center',
        }}
        gutterBottom
        variant='h4'
        component='span'
      >
        {value}
      </Typography>
      <Button
        onClick={handleIncrease}
        sx={{ fontSize: '24px', width: isFlexSize ? '40%' : 'max(60px,3.1vw)' }}
        variant='text'
      >
        +
      </Button>
    </ButtonGroup>
  );
}
