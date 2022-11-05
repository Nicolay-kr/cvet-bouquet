import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './InstagramBlock.module.css';

export default function InstagramBlock() {
  return (
    <div className={styles.сonteiner}>
      <div className={styles.titleConteiner}>
        <Typography variant='h1' component='h2' sx={{ mr: 'auto' }}>
          Подписыватесь
        </Typography>

        <Typography
          variant='h2'
          component='p'
          sx={{ ml: 'auto', mt: 'max(20px,1vw)' }}
        >
          на наш инстаграм
        </Typography>
      </div>
      <Typography
        variant='h1'
        component='p'
        sx={{ fontSize: '64px', textAlign: 'end', mt: 'max(20px,1vw)' }}
      >
        @cvetbuket.by
      </Typography>
      <div className={styles.imagesConteiner}>
        <Box sx={{ border: '1px solid' }}></Box>
        <Box sx={{ border: '1px solid' }}></Box>
        <Box sx={{ border: '1px solid' }}></Box>
        <Box sx={{ border: '1px solid' }}></Box>
        <Box sx={{ border: '1px solid' }}></Box>
        <Box sx={{ border: '1px solid' }}></Box>
      </div>
    </div>
  );
}
