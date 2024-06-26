import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import bigFlower from '../../../public/assets/images/bigFlower.png';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import size from '../../utils/size';
import Image from 'next/future/image';

export default function EmptyCart() {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          height: '70vh',
          px: { xs: '5%', lg: '10%' },
        }}
      >
        <Box
          component={Image}
          src={bigFlower}
          alt='flower image'
          sx={{
            position: 'absolute',
            top: { xs: '40vh', lg: '35vh' },
            right: { xs: '10%', lg: '58%' },
            mr: { xs: '0', lg: '-25%' },
            width: { xs: '80vw', lg: '30vw' },
            height: { xs: '80vw', lg: '30vw' },
          }}
        ></Box>
        <Typography
          variant='h1'
          component='h1'
          color='#000000'
          sx={{
            fontSize: { xs: '40px', lg: '65px', xxl: '3.4vw' },
            position: 'relative',
            left: { xs: '0%', lg: '-3%' },
            mt: { xs: '40px', lg: '80px' },
          }}
        >
          Ваша корзина пуста
        </Typography>
        <Typography
          variant='h4'
          component='p'
          sx={{
            position: 'relative',
            mt: { xs: '20px', lg: '20px' },
          }}
        >
          Пожалуйста, добавьте букет в корзину
        </Typography>

        <Button
          sx={{
            height: { ...size(60), xs: 60 },
            width: { ...size(360), xs: '100%' },
            bgcolor: 'primary.main',
            mt: size(60),
            fontSize: {...size(24),xs:18},
            fontWeight: { xs: '600' },
          }}
          variant='contained'
          onClick={() => router.push('/catalog')}
        >
          Выбрать букет
        </Button>
      </Box>
    </>
  );
}
