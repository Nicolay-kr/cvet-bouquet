import React from 'react';
import { useRouter } from 'next/router';
import styles from './Header.module.css';
// import Button from '@mui/material/Button';
import Link from '../CustopNextComponents/Link';
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

export const Header = ({ category }) => {
  const router = useRouter();
  const sm = useMediaQuery('(max-width:600px)');
  const lg = useMediaQuery('(max-width:1200px)');
  const xl = useMediaQuery('(max-width:1536px)');
  const bouckeList = useAppContext();

  const pages = [
    { title: 'Свободный платеж', slug: { current: '/freepay' } },
    { title: 'E-pos оплата', slug: { current: '/e-pos' } },
    { title: 'Доставка и самовывоз', slug: { current: '/delivery' } },
  ];

  const bouquetsCategory = [
    {
      title: 'Цветочные письма',
      slug: { _type: 'slug', current: 'cvetochnye-pisma' },
    },
    {
      title: 'Цветочные письма',
      slug: { _type: 'slug', current: 'cvetochnye-pisma' },
    },
    {
      title: 'Букет невесты',
      slug: { _type: 'slug', current: 'buket-nevesty' },
    },
    {
      title: 'Монобукет',
      slug: { _type: 'slug', current: 'monobukety' },
    },
    {
      title: 'Авторские букеты',
      slug: { _type: 'slug', current: 'avtorskie-bukety' },
    },
    {
      title: 'Премиум флористика',
      slug: { _type: 'slug', current: 'premium-floristika' },
    },
    {
      title: 'В коробке',
      slug: { _type: 'slug', current: 'v-korobke' },
    },
    {
      title: 'В корзине',
      slug: { _type: 'slug', current: 'v-korzine' },
    },
  ];

  const navList = (
    <ul className={styles.navigation}>
      <li>
        <a onClick={() => router.push('/catalog')}>Каталог</a>
        <DropList list={bouckeList.bouquetsCategories} prevSlug={'/catalog'} />
      </li>
      <li>
        <a onClick={() => router.push('/delivery')}>Доставка и оплата</a>
        <DropList list={pages} prevSlug={null} />
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
    <Box width='100%' px={{ xs: '5%', sm: '10%' }} component='header'>
      <Box className={styles.headerContent} component='nav' sx={{gridTemplateColumns: {xs:'1fr 2fr 1fr',lg:'5fr 5fr 2fr;'}}}>
        {lg ? (
          <Box className={styles.iconsConteiner} sx={{mr:'auto',ml:'0px'}}>
            <IconButton component={Link} href='/'>
              <Image src={burgerIcon} alt='burger icon'></Image>
            </IconButton>
            <IconButton component={Link} href='/'>
              <Image src={searchIcon} alt='search icon'></Image>
            </IconButton>
          </Box>
        ) : null}

        <Box
          className={styles.logoConteiner}
          component={Link}
          noLinkStyle
          href='/'
          sx={{justifyContent: {xs:'center',lg:'start'},pr: {xs:'0',lg:'20px'}}}
        >
          <Image src={logoFlower} alt='logo flower'></Image>
          <Image src={logoText} alt='logo flower'></Image>
        </Box>
        {lg ? null : navList}

        <Box className={styles.iconsConteiner}>
          {lg ? null : (
            <IconButton component={Link} href='/'>
              <Image src={searchIcon} alt='search icon'></Image>
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
          <IconButton
            component={Link}
            href='https://www.instagram.com/cvetbuket.by/'
          >
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
