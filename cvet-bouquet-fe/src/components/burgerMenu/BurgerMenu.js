import * as React from 'react';

import Whitecros from '../../../public/assets/icons/whitecros.svg';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from '../../../node_modules/@mui/material/index';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import BurgerIcon from '../../../public/assets/icons/burger.svg';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Viber from '../../../public/assets/icons/viber.svg';
import Whatsapp from '../../../public/assets/icons/whatsapp.svg';
import Telegram from '../../../public/assets/icons/telegram.svg';
import Typography from '@mui/material/Typography';
import BurgerAccordion from '../burgerAccordion/BurgerAccordion';

export default function BurgerMenu({ categories, shops }) {
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
      links: categories,
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
        aria-label="BurgerIcon"
        
        component='span'
        role='button'
        onClick={(e) => toggleDrawer(e, true)}
        onKeyDown={(e) => toggleDrawer(e, true)}
      >
        {/* <Box
          component={Image}
          sx={{
            width: { xs: '24px', sm: '24px' },
            height: { xs: '24px', sm: '24px' },
          }}
          src={burgerIcon}
          alt='belcard icon'
        ></Box> */}
        <BurgerIcon/>
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
            aria-label="CrossIcon"
            
          >
            {/* <Box
              component={Image}
              sx={{ width: '24px', height: '24px' }}
              src={whitecros}
              alt='cros icon'
            ></Box> */}
            <Whitecros/>
          </IconButton>

          <List
            sx={{
              my: '20px',
              '& li+li': {
                mt: '20px',
              },
            }}
          >
            {listItems?.map((item, index) => (
              <ListItem key={index} disablePadding>
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
            <IconButton onClick={() => router.push('/')} aria-label="TelegramIcon">
              {/* <Image src={telegram} alt='telegram icon'></Image> */}
              <Telegram/>
            </IconButton>
            <IconButton onClick={() => router.push('/')} aria-label="ViberIcon">
              {/* <Image src={viber} alt='viber icon'></Image> */}
              <Viber/>
            </IconButton>
            <IconButton onClick={() => router.push('/')} aria-label="WhatsappIcon">
              {/* <Image src={whatsapp} alt='whatsapp icon'></Image> */}
              <Whatsapp/>
            </IconButton>
          </Box>
          <Box sx={{ mt: '40px', mr: 'auto' }}>
            {shops?.map((shop) =>
              shop.published ? (
                <Typography variant='body1' color='white' key={shop.adress}>
                  {shop.adress}
                </Typography>
              ) : null
            )}
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
