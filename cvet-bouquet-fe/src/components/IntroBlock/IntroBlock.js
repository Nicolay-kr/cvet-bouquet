import * as React from 'react';
import styles from './IntroBlock.module.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '../../Link';
import Image from 'next/future/image';
import introImg1 from '../../assets/images/intro_img1.png';
import introImg2 from '../../assets/images/intro_img2.png';
import ArcheConteiner from '../ArcheConteiner/ArcheConteiner';

export default function IntroBlock() {
  return (
    <Box width='100%' px='10%'>
      <Box mb={10} className={styles.content}>
        <Box className={styles.textBox}>
          <Box pt='100px' className={styles.textBoxTitle}>
            <Typography
              sx={{ fontSize: { md: '60px', xl: 'max(82px,4.3vw)' } }}
              variant='h2'
              component='h1'
            >
              Флористика
            </Typography>
            <Typography
              sx={{ fontSize: { md: '140px', xl: 'max(140px,7.3vw)' } }}
              variant='h1'
              component='h1'
              className={styles.specialFont}
            >
              с утонченным
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  md: '60px',
                  xl: 'max(82px,4.3vw)',
                },
              }}
              variant='h2'
              component='h1'
            >
              вкусом
            </Typography>
          </Box>
          <Typography my='auto' variant='h4' component='p'>
            Выбирайте лучшее из того, что можно позволить. Создавайте сказку, не
            дожидаясь завтра!
          </Typography>
          <Box className={styles.buttonBox}>
            <Button
              sx={{ height: '60px', width: '100%', bgcolor: 'primary.main' }}
              variant='contained'
            >
              Выбрать букет
            </Button>
          </Box>
        </Box>
        <Box pl={12.5} className={styles.mediaBox}>
          {/* <Image
            className={styles.mainImage}
            src={introImg1}
            alt='image'
          ></Image> */}
          <Box sx={{mt:'60px'}}>
          <ArcheConteiner src={introImg1}></ArcheConteiner>

          </Box>
          <Image src={introImg2} alt='image'></Image>
        </Box>
      </Box>
    </Box>
  );
}
