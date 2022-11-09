import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './InstagramBlock.module.css';
// import InstagramEmbed from 'react-instagram-embed';
// import Instagram from '../Instagram/Instagram';

export default function InstagramBlock({ instagramPosts }) {
  console.log(instagramPosts.data);
  return (
    <div>
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
        {instagramPosts.data.map((item, index) => {
          if (index <= 5) {
            return (<img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              key={item.id}
              src={item.media_url}
            ></img>)
          }
        })}
      </div>
    </div>
  );
}
