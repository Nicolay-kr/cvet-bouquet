import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './InstagramBlock.module.css';
import TitleWithSubtitle from '../TitleWithSubtitle/TitleWithSubtitle';
import useMediaQuery from '@mui/material/useMediaQuery';
// import InstagramEmbed from 'react-instagram-embed';
// import Instagram from '../Instagram/Instagram';

export default function InstagramBlock({ instagramPosts }) {
  const md = useMediaQuery('(min-width:900px)');
  const postsNumber = md? 6:4
  return (
    <>
      <TitleWithSubtitle
        title={'Подписыватесь'}
        subtitle={'на наш инстаграм'}
      ></TitleWithSubtitle>
      <Box
        component='p'
        sx={{
          fontFamily: 'Zeferino One, serif',
          fontSize: {
            xs: '24px',
            sm: '40px',
            md: '60px',
            xl: '3.3vw',
          },
          m:'0',
          color:'#000000',
          textAlign: 'end',
          mt: 'max(20px,1vw)',
        }}
      >
        @cvetbuket.by
      </Box>
      <div className={styles.imagesConteiner}>
        {instagramPosts.data.map((item, index) => {
          if (index <= postsNumber-1) {
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
    </>
  );
}
