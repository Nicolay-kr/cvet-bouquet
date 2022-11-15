import React from 'react';
import { useRouter } from 'next/router';
import styles from './Header.module.css';
// import Button from '@mui/material/Button';
import Link from '../../Link';
import Box from '@mui/material/Box';
import logoFlower from '../../assets/images/logo_flower.svg';
import logoText from '../../assets/images/logo_text.svg';
import Image from 'next/future/image';
import searchIcon from '../../assets/icons/search.svg';
import heartIcon from '../../assets/icons/heart.svg';
import instaIcon from '../../assets/icons/insta.svg';
import bagIcon from '../../assets/icons/bag.svg';
import burgerIcon from '../../assets/icons/burger.svg';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import Badge from '@mui/material/Badge';

// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import DropList from '../DropList/DropList';
import { useAppContext } from '../context/BouquetsContext';

export const Header = ({category}) => {
  const router = useRouter();
  const sm = useMediaQuery('(max-width:600px)');
  const lg = useMediaQuery('(max-width:1200px)');
  const xl = useMediaQuery('(max-width:1536px)');
  const bouckeList = useAppContext();
  
  const navList = (
    <ul className={styles.navigation}>
      <li>
        <a onClick={() => router.push('/catalog')}>Каталог</a>
        <DropList list={bouckeList.bouquetsCategories} />
      </li>
      <li>
        <a onClick={() => router.push('/delivery')}>Доставка и оплата</a>
        <DropList list={null}/>
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
        {lg ? (
          <Box className={styles.iconsConteiner}>
            <IconButton component={Link} href='/'>
              <Image src={burgerIcon} alt='burger icon'></Image>
            </IconButton>
            <Image
              src={searchIcon}
              alt='search icon'
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
        {lg ? null : navList}

        <Box className={styles.iconsConteiner}>
          {lg ? null : (
            <IconButton component={Link} href='/'>
              <Image
                src={searchIcon}
                alt='search icon'
              ></Image>
            </IconButton>
          )}
          <IconButton component={Link} href='/favorites'>
            <Badge
              color='primary'
              badgeContent={bouckeList.favoriteBouquets.length}
            >
              <Image src={heartIcon} alt='heart icon'></Image>
            </Badge>
          </IconButton>
          <IconButton component={Link} href='https://www.instagram.com/cvetbuket.by/'>
            <Image src={instaIcon} alt='insta icon'></Image>
          </IconButton>
          <IconButton component={Link} href='/cart'>
            <Badge
              color='primary'
              badgeContent={bouckeList.bouquetsInCarts.length}
            >
              <Image src={bagIcon} alt='cart icon'></Image>
            </Badge>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
