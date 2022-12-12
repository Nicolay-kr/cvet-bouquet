import React from 'react';
import { useRouter } from 'next/router';
import styles from './Header.module.css';
// import Button from '@mui/material/Button';
import Link from '../CustopNextComponents/Link';
import Box from '@mui/material/Box';
import logo from '../../../public/assets/images/logo.svg';
import Image from 'next/future/image';
import heartIcon from '../../../public/assets/icons/heart.svg';
import instaIcon from '../../../public/assets/icons/insta.svg';
import bagIcon from '../../../public/assets/icons/bag.svg';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import DropList from '../DropList/DropList';
import { useAppContext } from '../context/BouquetsContext';
import BurgerMenu from '../burgerMenu/BurgerMenu';
import SearchModal from '../SearchModal';
export const Header = ({data}) => {
  const router = useRouter();
  const bouckeList = useAppContext();
  console.log(data)

  const pages = [
    { title: 'Свободный платеж', slug: { current: 'freepay' } },
    { title: 'E-pos оплата', slug: { current: 'e-pos' } },
    { title: 'Доставка и самовывоз', slug: { current: 'delivery' } },
  ];


  const navList = (
    <ul className={styles.navigation}>
      <li>
        {/* <a onClick={() => router.push('/catalog')}>Каталог</a> */}

        <DropList list={data?.categories?.categories?.filter(category => category.published ===true)} prevSlug={'/catalog'} title='Каталог' />
      </li>
      <li>
        {/* <a onClick={() => router.push('/delivery')}>Доставка и оплата</a> */}
        <DropList list={pages} prevSlug={null} title='Доставка и оплата' />
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
    <Box width='100%' px={{ xs: '5%', lg: '10%' }} component='header'>
      <Box
        className={styles.headerContent}
        component='nav'
        sx={{
          gridTemplateColumns: { xs: '1fr 3fr 1fr', lg: '5fr 5fr 2fr;' },
          columnGap: { xs: '10px', lg: '20px' },
        }}
      >

        <Box
          className={styles.iconsConteiner}
          sx={{ display: { xs: 'flex', lg: 'none' }, mr: 'auto', ml: '0px' }}
        >
          <BurgerMenu></BurgerMenu>
          <SearchModal></SearchModal>
        </Box>

        <Box
          className={styles.logoConteiner}
          component={Link}
          noLinkStyle
          href='/'
          sx={{
            justifyContent: { xs: 'center', lg: 'start' },
            pr: { xs: '0', lg: '20px' },
          }}
        >
          <Image src={logo} alt='logo '></Image>
        </Box>
        <Box sx={{ display: { xs: 'none', lg: 'block',alignSelf: 'center' } }}>{navList}</Box>

        <Box
          className={styles.iconsConteiner}
          sx={{ '& a': { px: { xs: '4px', sm: '8px' } } }}
        >
          {/* {lg ? null : <SearchModal bouquets={bouquets}></SearchModal>} */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <SearchModal></SearchModal>
          </Box>
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
