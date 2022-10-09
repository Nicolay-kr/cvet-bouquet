import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Header.module.css';
// import Button from '@mui/material/Button';
import Link from '../Link';
import { Box } from '@mui/system';
import logoFlower from '../assets/images/logo_flower.svg';
import logoText from '../assets/images/logo_text.svg';
import Image from 'next/future/image';
import searchIcon from '../assets/icons/search.svg';
import heartIcon from '../assets/icons/heart.svg';
import instaIcon from '../assets/icons/insta.svg';
import bagIcon from '../assets/icons/bag.svg';
import burgerIcon from '../assets/icons/burger.svg';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';

// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import DropList from './DropList';

export const Header = () => {
  const router = useRouter();
  const sm = useMediaQuery('(max-width:600px)');
  const lg = useMediaQuery('(max-width:1200px)');
  const xl = useMediaQuery('(max-width:1536px)');

  const navList = (
    <ul className={styles.navigation}>
      <li>
        <a onClick={() => router.push('/catalog')}>Каталог</a>
        <DropList />
      </li>
      <li>
        <a onClick={() => router.push('/delivery')}>Доставка и оплата</a>
        <DropList />
      </li>
      <li>
        <a onClick={() => router.push('/contacts')}>Контакты</a>
      </li>
      <li>
        <a onClick={() => router.push('/aboutus')}>О нас</a>
      </li>
    </ul>
  );

  return (
    <Box width='100%' px='10%' component='header'>
      <Box className={styles.headerContent} component='nav'>
        {sm ? (
          <Box className={styles.iconsConteiner}>
            <IconButton component={Link} href='/'>
              <Image src={burgerIcon} alt='burger icon'></Image>
            </IconButton>
            <Image
              src={searchIcon}
              alt='search icon'
              component={Link}
              href='/'
            ></Image>
          </Box>
        ) : null}

        <Box
          className={styles.logoConteiner}
          component={Link}
          noLinkStyle
          href='/'
        >
          <Image src={logoFlower} alt='logo flower'></Image>
          <Image src={logoText} alt='logo flower'></Image>
        </Box>
        {sm ? null : navList}

        <Box className={styles.iconsConteiner}>
          {sm ? null : (
            <IconButton component={Link} href='/'>
              <Image
                src={searchIcon}
                alt='search icon'
                component={Link}
                href='/'
              ></Image>
            </IconButton>
          )}
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
