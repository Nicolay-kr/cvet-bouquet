import * as React from 'react';

import whitecros from '../../../public/assets/icons/whitecros.svg';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from '../../../node_modules/@mui/material/index';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import logoFlower from '../../../public/assets/images/logo_flower.svg';
import Box from '@mui/material/Box';
import burgerIcon from '../../../public/assets/icons/burger.svg';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import viber from '../../../public/assets/icons/viber.svg';
import whatsapp from '../../../public/assets/icons/whatsapp.svg';
import telegram from '../../../public/assets/icons/telegram.svg';
import Typography from '@mui/material/Typography';
import BurgerAccordion from '../burgerAccordion/BurgerAccordion';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const toggleDrawer = (event, open) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };
  const bouquetsCategory = [
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

  const pages = [
    { title: 'Свободный платеж', slug: { current: '/freepay' } },
    { title: 'E-pos оплата', slug: { current: '/e-pos' } },
    { title: 'Доставка и самовывоз', slug: { current: '/delivery' } },
  ];

  const listItems = [
    {
      title: 'Каталог',
      href: '/catalog',
      hasMenu: true,
      links: bouquetsCategory,
      parentSlug: '/catalog/',
    },
    {
      title: 'Доставка и оплата',
      href: '/delivery',
      hasMenu: true,
      links: pages,
      parentSlug: '',
    },
    { title: 'Контакты', href: '/contacts' },
    { title: 'О нас', href: '/aboutus' },
    { title: 'Бонусная программа', href: '/bonuscard' },
    { title: 'Корпоративным клиентам', href: '/corporateclients' },
  ];

  return (
    <>
      <IconButton
        sx={{
          mt: 1.6,
          px: { xs: '4px', sm: '8px' },
          width: {},
        }}
        component='span'
        role='presentation'
        onClick={(e) => toggleDrawer(e, true)}
        onKeyDown={(e) => toggleDrawer(e, true)}
      >
        <Box
          component={Image}
          sx={{
            width: { xs: '20px', sm: '24px'},
            height: { xs: '20px', sm: '24px'},
          }}
          src={burgerIcon}
          alt='belcard icon'
        ></Box>
      </IconButton>
      <SwipeableDrawer
        anchor='left'
        open={isOpen}
        onClose={(e) => toggleDrawer(e, false)}
        onOpen={(e) => toggleDrawer(e, true)}
        PaperProps={{
          sx: { width: '100%', bgcolor: 'primary.main' },
        }}
        swipeAreaWidth={0}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            px: '5%',
            py: '40px',
          }}
        >
          <IconButton
            sx={{
              mr: 'auto',
            }}
            component='p'
            role='presentation'
            onClick={(e) => toggleDrawer(e, false)}
          >
            <Box
              component={Image}
              sx={{ width: '24px', height: '24px' }}
              src={whitecros}
              alt='cros icon'
            ></Box>
          </IconButton>

          <List
            sx={{
              mt: '40px',
              '& li+li': {
                mt: '20px',
              },
            }}
          >
            {listItems.map((item, index) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton>
                  {item.hasMenu ? (
                    <BurgerAccordion
                      title={item.title}
                      links={item.links}
                      parentSlug={item.parentSlug}
                      onClose={(e) => toggleDrawer(e, false)}
                    />
                  ) : (
                    <Box
                      sx={{ color: 'white', my: '0', fontSize: '24px' }}
                      component='p'
                      onClick={(e) => {
                        router.push(item.href), toggleDrawer(e, false);
                      }}
                    >
                      {item.title}
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              width: '100%',
              mt: 'auto',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <IconButton onClick={() => router.push('/')}>
              <Image src={telegram} alt='telegram icon'></Image>
            </IconButton>
            <IconButton onClick={() => router.push('/')}>
              <Image src={viber} alt='viber icon'></Image>
            </IconButton>
            <IconButton onClick={() => router.push('/')}>
              <Image src={whatsapp} alt='whatsapp icon'></Image>
            </IconButton>
          </Box>
          <Box sx={{ mt: '40px', mr: 'auto' }}>
            <Typography variant='body1' color='white'>
              пр.Победителей, 27 (Славянский квартал)
            </Typography>
            <Typography variant='body1' color='white'>
              пр.Независимости, 104 (метро Московская)
            </Typography>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
