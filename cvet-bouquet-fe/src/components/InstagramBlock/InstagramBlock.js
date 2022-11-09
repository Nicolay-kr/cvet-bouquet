import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './InstagramBlock.module.css';
import TitleWithSubtitle from '../TitleWithSubtitle/TitleWithSubtitle';
// import InstagramEmbed from 'react-instagram-embed';
// import Instagram from '../Instagram/Instagram';

export default function InstagramBlock({ instagramPosts }) {
  return (
    <div>
      <TitleWithSubtitle
        title={'Подписыватесь'}
        subtitle={'на наш инстаграм'}
      ></TitleWithSubtitle>
      <Typography
        variant='h1'
        component='p'
        sx={{
          fontSize: {
            md: '60px',
            xl: '3.3vw',
          },
          textAlign: 'end',
          mt: 'max(20px,1vw)',
        }}
      >
        @cvetbuket.by
      </Typography>
      <div className={styles.imagesConteiner}>
        {instagramPosts.data.map((item, index) => {
          if (index <= 5) {
            return (
              <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                key={item.id}
                src={item.media_url}
              ></img>
            );
          }
        })}
      </div>
    </div>
  );
}
