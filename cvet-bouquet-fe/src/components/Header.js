import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Header.module.css';
import Button from '@mui/material/Button';
import Link from '../Link';
import { Box } from '@mui/system';
import logoFlower from '../assets/images/logo_flower.svg';
import logoText from '../assets/images/logo_text.svg';
import Image from 'next/future/image';
import searchIcon from '../assets/icons/search.svg';
import heartIcon from '../assets/icons/heart.svg';
import instaIcon from '../assets/icons/insta.svg';
import bagIcon from '../assets/icons/bag.svg';
import IconButton from '@mui/material/IconButton';

export const Header = () => {
  const router = useRouter();

  return (
    <Box width='100%' px='10%' component='header'>
      <Box className={styles.headerContent} component='nav'>
        <Box
          className={styles.logoConteiner}
          component={Link}
          noLinkStyle
          href='/'
        >
          <Image src={logoFlower} alt='logo flower'></Image>
          <Image src={logoText} alt='logo flower'></Image>
        </Box>
        <ul className={styles.navigation}>
          <li onClick={() => router.push('/catalog')}>Каталог</li>
          <li onClick={() => router.push('/delivery')}>Доставка и оплата</li>
          <li onClick={() => router.push('/contacts')}>Контакты</li>
          <li onClick={() => router.push('/aboutus')}>О нас</li>
        </ul>
        <Box className={styles.iconsConteiner}>
          <IconButton component={Link} href='/'>
            <Image
              src={searchIcon}
              alt='search icon'
              component={Link}
              href='/'
            ></Image>
          </IconButton>
          <IconButton component={Link} href='/'>
            <Image src={heartIcon} alt='heart icon'></Image>
          </IconButton>
          <IconButton component={Link} href='/'>
            <Image src={instaIcon} alt='insta icon'></Image>
          </IconButton>
          <IconButton component={Link} href='/'>
            <Image src={bagIcon} alt='bag icon'></Image>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
