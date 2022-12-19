import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import size from '../../utils/size';

const Promocode = ({ isActive, promocode, handleClickPromoCode, handlePromocodeChange }) => {
  return (
    <>
      {isActive ? (
        <Box
          sx={{
            display: 'flex',
            my: size(20),
            borderRadius: '8px',
            height: '36px',
          }}
        >
          <TextField
            onChange={handlePromocodeChange}
            id='promocode'
            value={promocode}
            sx={{
              height: '100%',
              '&>div': { height: '100%', borderRadius: '8px 0px 0px 8px' },
            }}
          />

          <Button
            sx={{
              width: 130,
              color: 'white',
              borderRadius: '0 8px 8px 0',
            }}
            variant='contained'
          >
            Применить
          </Button>
        </Box>
      ) : (      <Typography
        sx={{
          color: 'primary.main',
          mt: 2,
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        variant='h5'
        component='p'
        onClick={handleClickPromoCode}
      >
        Ввести промокод
      </Typography>)}
    </>
  );
};

export default Promocode;
