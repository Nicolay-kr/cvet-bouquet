import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from "next/image";
import bigFlower404 from '../public/assets/images/404.png';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import size from '../src/utils/size';

export default function Custom404() {
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
          src={bigFlower404}
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
            height: { ...size(60), xs: 60 },
            width: { ...size(360), xs: '100%' },
            bgcolor: 'primary.main',
            mt: size(60),
            fontSize: {...size(24),xs:18},
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
