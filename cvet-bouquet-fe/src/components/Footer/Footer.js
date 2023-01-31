import React from 'react';
import styles from './Footer.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Link from '../CustopNextComponents/Link';
import logoFlower from '../../../public/assets/images/logo_flower_white.png';
import logoText from '../../../public/assets/images/logo_text_white.png';
import visa from '../../../public/assets/icons/visa.png';
import mir from '../../../public/assets/icons/mir.png';
import mastercard from '../../../public/assets/icons/mastercard.png';
import belcard from '../../../public/assets/icons/belcard.png';
import telegram from '../../../public/assets/icons/telegram.png';
import viber from '../../../public/assets/icons/viber.png';
import whatsapp from '../../../public/assets/icons/whatsapp.png';
import Letter from '../../../public/assets/icons/letter.svg';
import Phone from '../../../public/assets/icons/phone.svg';
import Instamini from '../../../public/assets/icons/insta_mini.svg';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import size from '../../utils/size';
import Image from 'next/future/image';
import BlockContentBox from '../blockcontentBox/BlockContentBox';

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
                  <Image
                    src={logoFlower}
                    quality={100}
                    width={90}
                    alt='logo flower'
                  ></Image>
                  <Image
                    src={logoText}
                    quality={100}
                    width={236}
                    alt='logo text'
                  ></Image>
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
                      {data?.phone}
                    </Typography>
                  </Typography>
                  <Typography variant='h6' component='li' color='white'>
                    <Typography
                      variant='h6'
                      component='a'
                      color='white'
                      href={`mailto:${data?.email}`}
                    >
                      {data?.email}
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
                    onClick={() =>
                      router.push(data?.telegram ? data?.telegram : '/')
                    }
                  >
                    <Typography variant='h6' component='p' color='white'>
                      Телеграм канал
                    </Typography>
                  </Typography>
                </Typography>

                <Box columnGap={10} className={styles.iconsConteiner}>
                  <IconButton
                    component={Link}
                    href={data?.telegram ? data?.telegram : '/'}
                    aria-label='TelegramIcon'
                  >
                    <Image
                      src={telegram}
                      alt='telegram icon'
                      quality={100}
                      width={46}
                    ></Image>
                  </IconButton>
                  <IconButton
                    component={Link}
                    href={data?.viber ? data?.viber : '/'}
                    aria-label='ViberIcon'
                  >
                    <Image
                      src={viber}
                      alt='viber icon'
                      quality={100}
                      width={46}
                    ></Image>
                  </IconButton>
                  <IconButton
                    component={Link}
                    href={data?.whatsapp ? data?.whatsapp : '/'}
                    aria-label='WhatsappIcon'
                  >
                    <Image
                      src={whatsapp}
                      alt='whatsapp icon'
                      quality={100}
                      width={46}
                    ></Image>
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
                    <Box
                      component={Image}
                      src={visa}
                      alt='visa icon'
                      quality={100}
                      sx={{ width: size(64), height: size(46) }}
                    ></Box>
                    <Box
                      component={Image}
                      src={mastercard}
                      alt='mastercard icon'
                      quality={100}
                      sx={{ width: size(64), height: size(46) }}
                    ></Box>
                    <Box
                      component={Image}
                      src={belcard}
                      alt='belcard icon'
                      quality={100}
                      sx={{ width: size(64), height: size(46) }}
                    ></Box>
                    <Box
                      component={Image}
                      src={mir}
                      alt='mir icon'
                      quality={100}
                      sx={{ width: size(64), height: size(46) }}
                    ></Box>
                  </Box>
                </Box>
                <Box className={styles.logoConteiner} component={Link} href='/'>
                  <Image
                    src={logoFlower}
                    quality={100}
                    width={90}
                    alt='logo flower'
                  ></Image>
                  <Image
                    src={logoText}
                    quality={100}
                    width={236}
                    alt='logo text'
                  ></Image>
                </Box>
                <Typography
                  variant='h6'
                  component='ul'
                  color='white'
                  fontWeight='700'
                  className={styles.navigation}
                >
                  Категории
                  {data?.categories?.categories
                    ?.filter((category) => category?.published === true)
                    .map((category) => (
                      <Box key={category?.title}>
                        <Typography
                          variant='h6'
                          component='li'
                          color='white'
                          onClick={() =>
                            router.push(`/${category.slug.current}`)
                          }
                        >
                          {category?.title}
                        </Typography>
                      </Box>
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
                        {data?.phone}
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
                        href={`mailto:${data?.email}`}
                      >
                        {data?.email}
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
                    <IconButton
                      component={Link}
                      href={data?.telegram ? data?.telegram : '/'}
                      aria-label='TelegramIcon'
                    >
                      <Image
                        src={telegram}
                        alt='telegram icon'
                        quality={100}
                        width={46}
                      ></Image>
                    </IconButton>
                    <IconButton
                      component={Link}
                      href={data?.viber ? data?.viber : '/'}
                      aria-label='ViberIcon'
                    >
                      <Image
                        src={viber}
                        alt='viber icon'
                        quality={100}
                        width={46}
                      ></Image>
                    </IconButton>
                    <IconButton
                      component={Link}
                      href={data?.whatsapp ? data?.whatsapp : '/'}
                      aria-label='WhatsappIcon'
                    >
                      <Image
                        src={whatsapp}
                        alt='whatsapp icon'
                        quality={100}
                        width={46}
                      ></Image>
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
                width: { xs: '100%', lg: '45%' },
                gridTemplateRows: 'auto',
                color: 'white',
                '& p': {
                  color: 'white !important',
                  m: 0,
                },
              }}
            >
              {data?.orgInfo?.ru ? (
                <BlockContentBox
                  fs={18}
                  blocks={data.orgInfo.ru}
                ></BlockContentBox>
              ) : null}

              {/* <Typography variant='h6' component='p' color='white'>
                ООО “Студия Цвет Букет” УНП 193608253
              </Typography>
              <Typography variant='h6' component='p' color='white'>
                Регистрационный номер в торговом реестре РБ 455583 от
                18.07.2019г.
              </Typography> */}
            </Box>
          </Box>
          {lg ? (
            <>
              <Box columnGap={12} className={styles.iconsConteiner}>
                <Box
                  component={Image}
                  src={visa}
                  alt='visa icon'
                  quality={100}
                  sx={{ width: size(64), height: size(46) }}
                ></Box>
                <Box
                  component={Image}
                  src={mastercard}
                  alt='mastercard icon'
                  quality={100}
                  sx={{ width: size(64), height: size(46) }}
                ></Box>
                <Box
                  component={Image}
                  src={belcard}
                  alt='belcard icon'
                  quality={100}
                  sx={{ width: size(64), height: size(46) }}
                ></Box>
                <Box
                  component={Image}
                  src={mir}
                  alt='mir icon'
                  quality={100}
                  sx={{ width: size(64), height: size(46) }}
                ></Box>
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
