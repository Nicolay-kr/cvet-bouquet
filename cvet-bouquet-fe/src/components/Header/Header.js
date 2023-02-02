import React from 'react';
import styles from './Header.module.css';
import Link from '../CustopNextComponents/Link';
import Box from '@mui/material/Box';
import logo from '../../../public/assets/images/logo.png';
import HeeartIcon from '../../../public/assets/icons/heart.svg';
import InstaIcon from '../../../public/assets/icons/insta.svg';
import BagIcon from '../../../public/assets/icons/bag.svg';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Image from 'next/future/image';
import DropList from '../DropList/DropList';
import { useAppContext } from '../context/BouquetsContext';
import BurgerMenu from '../burgerMenu/BurgerMenu';
import SearchModal from '../SearchModal';
import size from '../../utils/size';

export const Header = ({ data }) => {
  const bouckeList = useAppContext();

  const pages = [
    { title: 'Свободный платеж', slug: { current: 'freepay' } },
    { title: 'E-pos оплата', slug: { current: 'e-pos' } },
    { title: 'Доставка и самовывоз', slug: { current: 'delivery' } },
  ];

  const navList = (
    <ul className={styles.navigation}>
      <li>
        <DropList
          list={data?.categories?.categories?.filter(
            (category) => category?.published === true
          )}
          prevSlug={'/catalog'}
          title='Каталог'
        />
      </li>
      <li>
        <DropList list={pages} prevSlug={null} title='Доставка и оплата' />
      </li>
      <li>
        <Box
          sx={{
            fontSize: { ...size(20), xs: 16 },
            fontWeight: '500',
            color: '#000000',
          }}
          noLinkStyle
          component={Link}
          href='/contacts'
        >
          Контакты
        </Box>
      </li>
      <li>
        <Box
          sx={{
            fontSize: { ...size(20), xs: 16 },
            fontWeight: '500',
            color: '#000000',
          }}
          noLinkStyle
          component={Link}
          href='/aboutus'
        >
          О нас
        </Box>
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
          position: 'relative',
          zIndex: '2',
          width: '100%',
          display: 'grid',
          py: {...size(40),xs:10},
          px: 0,
          borderBottom: '2px solid #A08863',
        }}
      >
        <Box
          className={styles.iconsConteiner}
          sx={{ display: { xs: 'flex', lg: 'none' }, mr: 'auto', ml: '0px' }}
        >
          <BurgerMenu
            categories={data?.categories?.categories?.filter(
              (category) => category?.published === true
            )}
            data={data}
          ></BurgerMenu>
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
          <Image src={logo} style={{objectFit:'contain'}} quality={100} width={300} alt='logo '></Image>
          {/* <Logo width={'100%'} height={'100%'}/> */}
        </Box>
        <Box sx={{ display: { xs: 'none', lg: 'block', alignSelf: 'center' } }}>
          {navList}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(3, auto)',
              lg: 'repeat(4, auto)',
            },
            marginLeft: { ...size(30), xs: 0 },
            alignItems: 'center',
            justifyContent: 'right',
            columnGap: size(8),
            '& a': { px: { xs: '4px', sm: '8px' } },
          }}
        >
          <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <SearchModal></SearchModal>
          </Box>
          <IconButton component={Link} href='/favorites' aria-label="HeeartIcon">
            <Badge
              color='primary'
              badgeContent={bouckeList.favoriteBouquets.length}
            >
              <HeeartIcon/>
            </Badge>
          </IconButton>
          <IconButton
            component={Link}
            href='https://www.instagram.com/cvetbuket.by/'
            aria-label="InstaIcon"
          >
            <InstaIcon/>
          </IconButton>
          <IconButton
            sx={{ pr: '0px !important', pt: '4px !important' }}
            component={Link}
            href='/cart'
            aria-label="BagIcon"
          >
            <Badge
              color='primary'
              badgeContent={bouckeList.bouquetsInCarts.length}
            >
              <BagIcon/>
            </Badge>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
