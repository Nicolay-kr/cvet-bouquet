import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/future/image';
import bigFlower500 from '../public/assets/images/500.png';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

export default function Custom500() {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          height:'70vh',
          px: { xs: '5%', lg: '10%' },
        }}
      >
        <Box
        component={Image}
          sx={{
            position: 'absolute',
            top: {xs:'30vh',lg:'20vh'},
            right: {xs:'10%',lg:'50%'},
            mr: {xs:'0',lg:'-25%'},
            width: {xs:'80vw',lg:'40vw'},
            height: {xs:'80vw',lg:'40vw'},
          }}
          src={bigFlower500}
          alt='flower'
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
          О нет
        </Typography>
        <Typography
          variant='h4'
          component='p'
          sx={{
            position: 'relative',
            mt: { xs: '20px', lg: '20px' },
          }}
        >
          Что-то пошло не так, давайте начем сначала.
        </Typography>

        <Button
          sx={{
            height: '60px',
            bgcolor: 'primary.main',
            mt: { xs: '30px' },
            fontSize: { xs: '18px', md: '24px' },
            fontWeight: { xs: '600' },
          }}
          variant='contained'
          onClick={() => router.push('/')}
        >
          Вернуться на главную
        </Button>
      </Box>
    </>
  );
}