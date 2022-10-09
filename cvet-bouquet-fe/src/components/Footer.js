import React from 'react';
import styles from '../../styles/Footer.module.css';
import { Box, Typography } from '../../node_modules/@mui/material/index';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import Link from '../Link';
import logoFlower from '../assets/images/logo_flower_white.svg';
import logoText from '../assets/images/logo_text_white.svg';
import visa from '../assets/icons/visa.svg';
import mastercard from '../assets/icons/mastercard.svg';
import belcard from '../assets/icons/belcard.svg';
import telegram from '../assets/icons/telegram.svg';
import viber from '../assets/icons/viber.svg';
import letter from '../assets/icons/letter.svg';
import phone from '../assets/icons/phone.svg';
import insta_mini from '../assets/icons/insta_mini.svg';
import whatsapp from '../assets/icons/whatsapp.svg';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Footer() {
  const router = useRouter();
  const sm = useMediaQuery('(max-width:600px)');
  const lg = useMediaQuery('(max-width:1200px)');
  const xl = useMediaQuery('(max-width:1536px)');
  return (
    <>
      <Box
        width='100%'
        px='10%'
        pt={12.5}
        pb={10}
        bgcolor='secondary.main'
        component='footer'
      >
        <Box className={styles.content}>
          <Box className={styles.links}>
            {sm ? (
              <>
                <Box
                  className={styles.logoConteiner}
                  component={Link}
                  noLinkStyle
                  href='/'
                  sx={{ gridColumnStart: '1', gridColumnEnd: '3' }}
                >
                  <Image src={logoFlower} alt='logo flower'></Image>
                  <Image src={logoText} alt='logo flower'></Image>
                </Box>
                {/* <Box className={styles.doubleColumn}> */}
                <Typography
                  variant='subtitle1'
                  component='ul'
                  color='white'
                  fontWeight='700'
                  className={styles.navigation}
                >
                  Меню
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/catalog')}
                  >
                    Каталог
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/delivery')}
                  >
                    Доставка и оплата
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/contacts')}
                  >
                    Контакты
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/aboutus')}
                  >
                    О нас
                  </Typography>
                </Typography>
                <Typography
                  variant='subtitle1'
                  component='ul'
                  color='white'
                  fontWeight='700'
                  className={styles.navigation}
                >
                  Режим работы:
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/catalog')}
                  >
                    Пн-Вс 09:00-21:00
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/delivery')}
                  >
                    пр.Победителей, 27 пом. 344
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/contacts')}
                  >
                    пр. Независимости, 104
                  </Typography>
                </Typography>
                {/* </Box> */}

                {/* <Box className={styles.lastColumn}> */}
                  <Typography
                    variant='subtitle1'
                    component='ul'
                    color='white'
                    fontWeight='700'
                    className={styles.navigation}
                  >
                    Контакты
                    <Typography
                      flex
                      variant='subtitle1'
                      component='li'
                      onClick={() => router.push('/catalog')}
                    >
                      <Image src={phone} alt='phone icon'></Image>
                      <Typography
                        ml={4}
                        variant='subtitle1'
                        component='p'
                        color='white'
                      >
                        +375 44 556-55-55
                      </Typography>
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/delivery')}
                    >
                      <Image src={insta_mini} alt='insta icon'></Image>
                      <Typography
                        ml={4}
                        variant='subtitle1'
                        component='p'
                        color='white'
                      >
                        @cvetbuket.by
                      </Typography>
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/contacts')}
                    >
                      <Image src={letter} alt='letter icon'></Image>
                      <Typography
                        ml={4}
                        variant='subtitle1'
                        component='p'
                        color='white'
                      >
                        info@cvetbuket.by
                      </Typography>
                    </Typography>
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='ul'
                    color='white'
                    fontWeight='700'
                    className={styles.navigation}
                  >
                    Подписывайтесь
                    <Typography
                      flex
                      variant='subtitle1'
                      component='li'
                      onClick={() => router.push('/catalog')}
                    >
                      <Typography
                    
                        variant='subtitle1'
                        component='p'
                        color='white'
                      >
                        Инстаграм
                      </Typography>
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/delivery')}
                    >
                      <Typography
                        variant='subtitle1'
                        component='p'
                        color='white'
                      >
                        Телеграм канал
                      </Typography>
                    </Typography>
                  </Typography>

                  <Box columnGap={1.5} className={styles.iconsConteiner}>
                    <IconButton component={Link} href='/'>
                      <Image src={telegram} alt='telegram icon'></Image>
                    </IconButton>
                    <IconButton component={Link} href='/'>
                      <Image src={viber} alt='viber icon'></Image>
                    </IconButton>
                    <IconButton component={Link} href='/'>
                      <Image src={whatsapp} alt='whatsapp icon'></Image>
                    </IconButton>
                  </Box>
                {/* </Box> */}
              </>
            ) : (
              <>
                <Box className={styles.doubleColumn}>
                  <Typography
                    variant='subtitle1'
                    component='ul'
                    color='white'
                    fontWeight='700'
                    className={styles.navigation}
                  >
                    Меню
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/catalog')}
                    >
                      Каталог
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/delivery')}
                    >
                      Доставка и оплата
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/contacts')}
                    >
                      Контакты
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/aboutus')}
                    >
                      О нас
                    </Typography>
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='ul'
                    color='white'
                    fontWeight='700'
                    className={styles.navigation}
                  >
                    Доставка и оплата
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/catalog')}
                    >
                      Свободный платеж
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/delivery')}
                    >
                      E-POS оплата
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/contacts')}
                    >
                      Возврат денежных средств на карту
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/aboutus')}
                    >
                      Доставка и самовывоз
                    </Typography>
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='ul'
                    color='white'
                    fontWeight='700'
                    className={styles.navigation}
                  >
                    Полезное
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/catalog')}
                    >
                      Каталог
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/delivery')}
                    >
                      Доставка и оплата
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/contacts')}
                    >
                      Контакты
                    </Typography>
                  </Typography>

                  <Box columnGap={1.5} className={styles.iconsConteiner}>
                    <IconButton component={Link} href='/'>
                      <Image src={visa} alt='visa icon'></Image>
                    </IconButton>
                    <IconButton component={Link} href='/'>
                      <Image src={mastercard} alt='mastercard icon'></Image>
                    </IconButton>
                    <IconButton component={Link} href='/'>
                      <Image src={belcard} alt='belcard icon'></Image>
                    </IconButton>
                  </Box>
                  {/* </Box> */}
                </Box>
                <Box
                  className={styles.logoConteiner}
                  component={Link}
                  noLinkStyle
                  href='/'
                >
                  <Image src={logoFlower} alt='logo flower'></Image>
                  <Image src={logoText} alt='logo flower'></Image>
                </Box>
                <Typography
                  variant='subtitle1'
                  component='ul'
                  color='white'
                  fontWeight='700'
                  className={styles.navigation}
                >
                  Категории
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/catalog')}
                  >
                    Авторские букеты
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/delivery')}
                  >
                    В коробке
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/contacts')}
                  >
                    Монобукеты
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/aboutus')}
                  >
                    Корзины с цветами
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/aboutus')}
                  >
                    Цветочные письма
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='li'
                    color='white'
                    onClick={() => router.push('/aboutus')}
                  >
                    Свадебная флористика
                  </Typography>
                </Typography>
                <Box className={styles.lastColumn}>
                  <Typography
                    variant='subtitle1'
                    component='ul'
                    color='white'
                    fontWeight='700'
                    className={styles.navigation}
                  >
                    Контакты
                    <Typography
                      flex
                      variant='subtitle1'
                      component='li'
                      onClick={() => router.push('/catalog')}
                    >
                      <Image src={phone} alt='phone icon'></Image>
                      <Typography
                        ml={4}
                        variant='subtitle1'
                        component='p'
                        color='white'
                      >
                        +375 44 556-55-55
                      </Typography>
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/delivery')}
                    >
                      <Image src={insta_mini} alt='insta icon'></Image>
                      <Typography
                        ml={4}
                        variant='subtitle1'
                        component='p'
                        color='white'
                      >
                        @cvetbuket.by
                      </Typography>
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/contacts')}
                    >
                      <Image src={letter} alt='letter icon'></Image>
                      <Typography
                        ml={4}
                        variant='subtitle1'
                        component='p'
                        color='white'
                      >
                        info@cvetbuket.by
                      </Typography>
                    </Typography>
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    component='ul'
                    color='white'
                    fontWeight='700'
                    className={styles.navigation}
                  >
                    Режим работы:
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/catalog')}
                    >
                      Пн-Вс 09:00-21:00
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/delivery')}
                    >
                      пр.Победителей, 27 пом. 344
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='li'
                      color='white'
                      onClick={() => router.push('/contacts')}
                    >
                      пр. Независимости, 104
                    </Typography>
                  </Typography>
                  <Box columnGap={1.5} className={styles.iconsConteiner}>
                    <IconButton component={Link} href='/'>
                      <Image src={telegram} alt='telegram icon'></Image>
                    </IconButton>
                    <IconButton component={Link} href='/'>
                      <Image src={viber} alt='viber icon'></Image>
                    </IconButton>
                    <IconButton component={Link} href='/'>
                      <Image src={whatsapp} alt='whatsapp icon'></Image>
                    </IconButton>
                  </Box>
                </Box>
              </>
            )}
          </Box>
          <Box className={styles.info}>
            <Box className={styles.infoContent}>
              <Typography variant='subtitle1' component='p' color='white'>
                ИП Новицкая Н.В. УНП 193193419 Свидетельство о госрегистрации
                выдано Минским горисполкомом 17.01.2019г.
              </Typography>
              <Typography variant='subtitle1' component='p' color='white'>
                Регистрационный номер в торговом реестре РБ 455583 от
                18.07.2019г.
              </Typography>
            </Box>
          </Box>
          {sm ? (
            <>
              <Box columnGap={1.5} className={styles.iconsConteiner}>
                <IconButton component={Link} href='/'>
                  <Image src={visa} alt='visa icon'></Image>
                </IconButton>
                <IconButton component={Link} href='/'>
                  <Image src={mastercard} alt='mastercard icon'></Image>
                </IconButton>
                <IconButton component={Link} href='/'>
                  <Image src={belcard} alt='belcard icon'></Image>
                </IconButton>
              </Box>
              <Box className={styles.info}>
                <Box className={styles.infoContent}>
                  <Typography variant='subtitle1' component='p' color='white'>
                    © Цвет·Букет 2022
                  </Typography>
                  <Typography variant='subtitle1' component='p' color='white'>
                    Политика конфиденциальности
                  </Typography>
                </Box>
              </Box>
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
