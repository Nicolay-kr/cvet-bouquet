import React from 'react';
import styles from './Footer.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Link from '../CustopNextComponents/Link';
import LogoFlower from '../../../public/assets/images/logo_flower_white.svg';
import LogoText from '../../../public/assets/images/logo_text_white.svg';
import Visa from '../../../public/assets/icons/visa.svg';
import Mastercard from '../../../public/assets/icons/mastercard.svg';
import Belcard from '../../../public/assets/icons/belcard.svg';
import Telegram from '../../../public/assets/icons/telegram.svg';
import Viber from '../../../public/assets/icons/viber.svg';
import Whatsapp from '../../../public/assets/icons/whatsapp.svg';
import Letter from '../../../public/assets/icons/letter.svg';
import Phone from '../../../public/assets/icons/phone.svg';
import Instamini from '../../../public/assets/icons/insta_mini.svg';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import size from '../../utils/size';

export default function Footer({ data }) {
  const router = useRouter();
  const lg = useMediaQuery('(max-width:1200px)');
  return (
    <>
      <Box
        width='100%'
        px='10%'
        pb={75}
        bgcolor='secondary.main'
        component='footer'
        sx={{ pt: size(100), px: { xs: '5%', lg: '10%' } }}
      >
        <Box className={styles.content}>
          <Box className={styles.links}>
            {lg ? (
              <>
                <Box
                  className={styles.logoConteiner}
                  component={Link}
                  href='/'
                  sx={{ gridColumnStart: '1', gridColumnEnd: '3' }}
                >
                  <LogoFlower />
                  <Box sx={{ mt: { ...size(20), xs: 20 } }}>
                    <LogoText />
                  </Box>
                </Box>
                <Typography
                  variant='h6'
                  component='ul'
                  color='white'
                  fontWeight='700'
                  className={styles.navigation}
                >
                  Меню
                  <Typography
                    variant='h6'
                    component='li'
                    color='white'
                    onClick={() => router.push('/catalog')}
                  >
                    Каталог
                  </Typography>
                  <Typography
                    variant='h6'
                    component='li'
                    color='white'
                    onClick={() => router.push('/delivery')}
                  >
                    Доставка и оплата
                  </Typography>
                  <Typography
                    variant='h6'
                    component='li'
                    color='white'
                    onClick={() => router.push('/contacts')}
                  >
                    Контакты
                  </Typography>
                  <Typography
                    variant='h6'
                    component='li'
                    color='white'
                    onClick={() => router.push('/aboutus')}
                  >
                    О нас
                  </Typography>
                </Typography>
                <Typography
                  variant='h6'
                  component='ul'
                  color='white'
                  fontWeight='700'
                  className={styles.navigation}
                >
                  Режим работы:
                  {data?.shopsList?.map((shop) =>
                    shop.published ? (
                      <Box key={shop.adress}>
                        <Typography
                          variant='h6'
                          component='li'
                          color='white'
                          sx={{
                            '&:hover': {
                              color: 'white !important',
                              pointer: 'none !important',
                            },
                          }}
                        >
                          {shop.time}
                        </Typography>
                        <Typography
                          variant='h6'
                          component='li'
                          color='white'
                          sx={{
                            '&:hover': {
                              color: 'white !important',
                              pointer: 'none !important',
                            },
                          }}
                        >
                          {shop.adress}
                        </Typography>
                      </Box>
                    ) : null
                  )}
                </Typography>

                <Typography
                  variant='h6'
                  component='ul'
                  color='white'
                  fontWeight='700'
                  className={styles.navigation}
                >
                  Контакты
                  <Typography variant='h6' component='li'>
                    <Typography
                      variant='h6'
                      component='a'
                      color='white'
                      href={`tel:${data?.phone?.replace(/-|\s/gi, '')}`}
                    >
                      {data.phone}
                    </Typography>
                  </Typography>
                  <Typography variant='h6' component='li' color='white'>
                    <Typography
                      variant='h6'
                      component='a'
                      color='white'
                      href={`mailto:${data.email}`}
                    >
                      {data.email}
                    </Typography>
                  </Typography>
                </Typography>
                <Typography
                  variant='h6'
                  component='ul'
                  color='white'
                  fontWeight='700'
                  className={styles.navigation}
                >
                  Подписывайтесь
                  <Typography variant='h6' component='li'>
                    <Typography
                      variant='h6'
                      color='white'
                      component='a'
                      href={`https://www.instagram.com/${data?.instagram?.slice(
                        1
                      )}`}
                      target='_component'
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      Инстаграм
                    </Typography>
                  </Typography>
                  <Typography
                    variant='h6'
                    component='li'
                    color='white'
                    onClick={() => router.push('/delivery')}
                  >
                    <Typography variant='h6' component='p' color='white'>
                      Телеграм канал
                    </Typography>
                  </Typography>
                </Typography>

                <Box columnGap={10} className={styles.iconsConteiner}>
                  <IconButton component={Link} href='/'>
                    <Telegram />
                  </IconButton>
                  <IconButton component={Link} href='/'>
                    <Viber />
                  </IconButton>
                  <IconButton component={Link} href='/'>
                    <Whatsapp />
                  </IconButton>
                </Box>
                {/* </Box> */}
              </>
            ) : (
              <>
                <Box className={styles.doubleColumn}>
                  <Typography
                    variant='h6'
                    component='ul'
                    color='white'
                    fontWeight='700'
                    className={styles.navigation}
                  >
                    Меню
                    <Typography
                      variant='h6'
                      component='li'
                      color='white'
                      onClick={() => router.push('/catalog')}
                    >
                      Каталог
                    </Typography>
                    <Typography
                      variant='h6'
                      component='li'
                      color='white'
                      onClick={() => router.push('/delivery')}
                    >
                      Доставка и оплата
                    </Typography>
                    <Typography
                      variant='h6'
                      component='li'
                      color='white'
                      onClick={() => router.push('/contacts')}
                    >
                      Контакты
                    </Typography>
                    <Typography
                      variant='h6'
                      component='li'
                      color='white'
                      onClick={() => router.push('/aboutus')}
                    >
                      О нас
                    </Typography>
                  </Typography>
                  <Typography
                    variant='h6'
                    component='ul'
                    color='white'
                    fontWeight='700'
                    className={styles.navigation}
                  >
                    Доставка и оплата
                    <Typography
                      variant='h6'
                      component='li'
                      color='white'
                      onClick={() => router.push('/freepay')}
                    >
                      Свободный платеж
                    </Typography>
                    <Typography
                      variant='h6'
                      component='li'
                      color='white'
                      onClick={() => router.push('/e-pos')}
                    >
                      E-POS оплата
                    </Typography>
                    <Typography
                      variant='h6'
                      component='li'
                      color='white'
                      onClick={() => router.push('/delivery')}
                    >
                      Возврат денежных средств на карту
                    </Typography>
                    <Typography
                      variant='h6'
                      component='li'
                      color='white'
                      onClick={() => router.push('/delivery')}
                    >
                      Доставка и самовывоз
                    </Typography>
                  </Typography>
                  <Typography
                    variant='h6'
                    component='ul'
                    color='white'
                    fontWeight='700'
                    className={styles.navigation}
                  >
                    Полезное
                    <Typography
                      variant='h6'
                      component='li'
                      color='white'
                      onClick={() => router.push('/corporateclients')}
                    >
                      Корпоративные клиенты
                    </Typography>
                    <Typography
                      variant='h6'
                      component='li'
                      color='white'
                      onClick={() => router.push('/bonuscard')}
                    >
                      Бонусная программа
                    </Typography>
                  </Typography>

                  <Box columnGap={12} className={styles.iconsConteiner}>
                    <Visa />
                    <Mastercard />
                    <Belcard />
                  </Box>
                </Box>
                <Box className={styles.logoConteiner} component={Link} href='/'>
                  <LogoFlower />
                  <Box sx={{ mt: { ...size(20), xs: 20 } }}>
                    <LogoText />
                  </Box>
                </Box>
                <Typography
                  variant='h6'
                  component='ul'
                  color='white'
                  fontWeight='700'
                  className={styles.navigation}
                >
                  Категории
                  {data?.categories?.categories?.map((category) => (
                    <Typography
                      key={category.title}
                      variant='h6'
                      component='li'
                      color='white'
                      onClick={() => router.push(`/${category.slug.current}`)}
                    >
                      {category.title}
                    </Typography>
                  ))}
                </Typography>
                <Box className={styles.lastColumn}>
                  <Typography
                    variant='h6'
                    component='ul'
                    color='white'
                    fontWeight='700'
                    className={styles.navigation}
                  >
                    Контакты
                    <Typography variant='h6' component='li'>
                      <Phone />
                      <Typography
                        variant='h6'
                        component='a'
                        color='white'
                        sx={{
                          ml: '16px',
                          cursor: 'pointer',
                        }}
                        href={`tel:${data?.phone?.replace(/-|\s/gi, '')}`}
                      >
                        {data.phone}
                      </Typography>
                    </Typography>
                    <Typography variant='h6' component='li' color='white'>
                      <Instamini />
                      <Typography
                        variant='h6'
                        color='white'
                        component='a'
                        href={`https://www.instagram.com/${data?.instagram?.slice(
                          1
                        )}`}
                        target='_component'
                        sx={{
                          ml: '16px',
                          cursor: 'pointer',
                        }}
                      >
                        {data?.instagram}
                      </Typography>
                    </Typography>
                    <Typography variant='h6' component='li' color='white'>
                      <Letter />
                      <Typography
                        variant='h6'
                        component='a'
                        color='white'
                        sx={{
                          ml: '16px',
                          cursor: 'pointer',
                        }}
                        href={`mailto:${data.email}`}
                      >
                        {data.email}
                      </Typography>
                    </Typography>
                  </Typography>
                  <Typography
                    variant='h6'
                    component='ul'
                    color='white'
                    fontWeight='700'
                    className={styles.navigation}
                  >
                    Режим работы:
                    {data?.shopsList?.map((shop) =>
                      shop.published ? (
                        <Box key={shop.adress}>
                          <Typography
                            variant='h6'
                            component='li'
                            color='white'
                            sx={{
                              '&:hover': {
                                color: 'white !important',
                                pointer: 'none !important',
                              },
                            }}
                          >
                            {shop.time}
                          </Typography>
                          <Typography
                            variant='h6'
                            component='li'
                            color='white'
                            sx={{
                              '&:hover': {
                                color: 'white !important',
                                pointer: 'none !important',
                              },
                            }}
                          >
                            {shop.adress}
                          </Typography>
                        </Box>
                      ) : null
                    )}
                  </Typography>
                  <Box columnGap={20} className={styles.iconsConteiner}>
                    <IconButton component={Link} href='/'>
                      <Telegram />
                    </IconButton>
                    <IconButton component={Link} href='/'>
                      <Viber />
                    </IconButton>
                    <IconButton component={Link} href='/'>
                      <Whatsapp />
                    </IconButton>
                  </Box>
                </Box>
              </>
            )}
          </Box>
          <Box
            className={styles.info}
            sx={{
              display: 'grid',
              gridTemplateRows: { xs: 'auto', lg: 'auto auto' },
            }}
          >
            <Box
              className={styles.infoContent}
              sx={{
                display: 'grid',
                rowGap: '24px',
                gridTemplateRows: { xs: 'auto', lg: 'auto auto' },
              }}
            >
              <Typography variant='h6' component='p' color='white'>
                ООО “Студия Цвет Букет” УНП 193608253
              </Typography>
              <Typography variant='h6' component='p' color='white'>
                Регистрационный номер в торговом реестре РБ 455583 от
                18.07.2019г.
              </Typography>
            </Box>
          </Box>
          {lg ? (
            <>
              <Box columnGap={12} className={styles.iconsConteiner}>
                <Visa />
                <Mastercard />
                <Belcard />
              </Box>
              <Box className={styles.info}>
                <Box className={styles.infoContent}>
                  <Typography variant='h6' component='p' color='white'>
                    © Цвет·Букет {new Date().getFullYear()}
                  </Typography>
                  <Typography
                    variant='h6'
                    component='p'
                    color='white'
                    onClick={() => router.push('/privacy')}
                  >
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
