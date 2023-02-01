import React, { useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import size from '../../utils/size';
import { sanityClient } from '../../../sanity';
import Snackbar from '@mui/material/Snackbar';

const Promocode = ({ setPromoCodeValue }) => {
  const [promocode, setPromocode] = React.useState('');
  const [isPromoCodeActive, setIsPromoCodeActive] = React.useState(false);
  const [isOpenSnack, setIsOpenSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const fetchData = useCallback(async (promocode) => {
    sanityClient
      .fetch(
        `*[ _type == "promocode" && code=="${promocode}"][0]{
          active,
          title,
          percent,
          code,
        }`
      )
      .then((data) => {
        console.log(data);
        if (data) {
          if(data.active){
            setSnackMessage('Промокод принят')
            setPromoCodeValue(data);
            setIsOpenSnack(true)

          }else{
            setSnackMessage('Промокод не активен')
            setIsOpenSnack(true)
          }
          
        } else {
          setSnackMessage('Промокод не найден')
          setIsOpenSnack(true)
        }
      })

      .catch(console.error);
  }, []);

  const handleCheckPromocode = () => {
    fetchData(promocode);
  };

  const handlePromocodeChange = (e) => {
    setPromocode(e.target.value);
  };

  const handleClickPromoCode = () => {
    setIsPromoCodeActive(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenSnack(false);
  };

  return (
    <>
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpenSnack}
        message={snackMessage}
        onClose={handleCloseSnackbar}
      />
      {isPromoCodeActive ? (
        <Box
          sx={{
            display: 'flex',
            mt: size(40),
            borderRadius: '8px',
            height: size(48),
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
              color: 'white',
              borderRadius: '0 8px 8px 0',
              height: size(48),
              width: '100%',
            }}
            variant='contained'
            onClick={handleCheckPromocode}
          >
            Применить
          </Button>
        </Box>
      ) : (
        <Typography
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            mt:size(40),
            '&:hover':{
              borderBottom: '1px solid',
            },
          }}
          variant='h5'
          component='p'
          onClick={handleClickPromoCode}
        >
          Ввести промокод
        </Typography>
      )}
    </>
  );
};

export default Promocode;
