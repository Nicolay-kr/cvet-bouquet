import React from 'react';
import styles from '../../styles/Cart.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppContext } from '../../src/components/context/BouquetsContext';
import Cros from '../../public/assets/icons/cros.svg';
import IconButton from '@mui/material/IconButton';
import Image from 'next/future/image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CounterButtons from '../../src/components/CounterButtons/CounterButtons';
import Checkout from '../../src/components/Checkout/Checkout';
import Link from '../../src/components/CustopNextComponents/Link';
import BreadCrumbs from '../../src/components/breadcrubs/BreadCrumbs';
import { urlFor } from '../../sanity';
import { useRouter } from 'next/router';
import Head from 'next/head';
import size from '../../src/utils/size';
import Promocode from '../../src/components/Promocode/Promocode';

const CartRow = ({ id, title, price, image, quantity, slug, categorySlug }) => {
  const bouquetsContext = useAppContext();

  const removeFromCart = () => {
    bouquetsContext.removeFromCart(id);
  };
  return (
    <>
      <TableRow
        key={id}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
          transition: '0.3s',
        }}
      >
        <TableCell component='th' scope='row'>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              '& img': { objectFit: 'cover' },
            }}
          >
            <Link href={`cart/${slug.current}`}>
              <Image
                style={{ objectFit: 'cover' }}
                layout='fill'
                width={100}
                height={125}
                src={urlFor(image).width(400).url()}
                alt='bouquet'
              ></Image>
            </Link>

            <Typography variant='body1'>{title}</Typography>
          </Box>
        </TableCell>

        <TableCell align='right' sx={{ width: 'max(200px,7.5vw)' }}>
          <span className={styles.price}>
            <Typography variant='h4'>{price}</Typography>
            <sup>BYN</sup>
          </span>
        </TableCell>

        <TableCell variant='h4' align='center'>
          {/* <Typography variant='h4'>{price}</Typography> */}
          <CounterButtons id={id} value={quantity} />
        </TableCell>

        <TableCell align='center' sx={{ width: 'max(200px,7.5vw)' }}>
          <span className={styles.price}>
            <Typography variant='h4'>{price * quantity}</Typography>
            <sup>BYN</sup>
          </span>
        </TableCell>

        <TableCell align='center'>
          <IconButton
            component='div'
            // className={styles.cardHeart}
            href='#'
            onClick={removeFromCart}
            aria-label='CrossIcon'
          >
            <Box
              component={Cros}
              sx={{ width: size(18) }}
              viewBox='0 0 18 18'
            ></Box>
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default function Cart() {
  const bouquetsContext = useAppContext();
  const bouquets = bouquetsContext.bouquetsInCarts;
  const router = useRouter();
  const [isCheckout, setIsCheckout] = React.useState(
    router.query.isCheckout ? router.query.isCheckout : false
  );
  const [isPromoCodeActive, setIsPromoCodeActivet] = React.useState(false);
  const [promocode, setPromocode] = React.useState('');

  const handleToCheckout = () => {
    setIsCheckout(true);
  };

  const handleClickPromoCode = () => {
    setIsPromoCodeActivet(true);
  };
  const handlePromocodeChange = (e) => {
    setPromocode(e.target.value);
  };

  const removeFromCart = (e, id) => {
    bouquetsContext.removeFromCart(id);
  };

  const breadCrumbsList = [
    { title: 'Главная', href: '/' },
    { title: 'Корзина', href: null },
  ];

  const price = bouquets.reduce(
    (akk, item) => akk + item.price * item.quantity,
    0
  );
  const delivery =
    price < bouquets[0]?.deliveryMin ? bouquets[0].deliveryPrice : 0;

  return (
    <>
      <Head lang='ru'>
        <title>Корзина | ЦВЕТ•БУКЕТ</title>
      </Head>

      <Box
        sx={{
          px: { xs: '5%', lg: '10%' },
          pb: 10,
        }}
      >
        <BreadCrumbs
          breadCrumbsList={breadCrumbsList}
          isInIntro={true}
        ></BreadCrumbs>
        <Box
          className={styles.conteiner}
          sx={{
            display: { xs: 'none', lg: 'grid' },
            gridTemplateColumns: { sx: '1fr', lg: '8fr 3fr' },
            columnGap: 'max(30px,1.5vw)',
            rawGap: 'max(30px,1.5vw)',
          }}
        >
          <Box>
            <TableContainer sx={{ width: '100%', mb: '24px' }} component='div'>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: '40%' }}></TableCell>
                    <TableCell align='center'>Цена</TableCell>
                    <TableCell align='center'>Количество</TableCell>
                    <TableCell align='center'>Сумма</TableCell>
                    <TableCell align='center'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bouquets.map((bouquet) => (
                    <CartRow
                      key={bouquet.id}
                      id={bouquet.id}
                      title={bouquet.title}
                      price={bouquet.price}
                      image={bouquet.imagePath}
                      quantity={bouquet.quantity}
                      slug={bouquet.slug}
                      categorySlug={bouquet.categorySlug}
                    ></CartRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Paper
            sx={{
              ml: { sm: '10%', xl: '20%' },
              px: '10%',
              bgcolor: 'fon.main',
              height: 'fit-content',
            }}
            elevation={3}
            className={styles.summConteiner}
          >
            <Typography sx={{ fontWeight: 700 }} variant='h4'>
              В корзине
            </Typography>
            <Typography
              sx={{ color: 'primary.main', mt: 2 }}
              variant='h5'
              component='p'
            >
              {bouquets.reduce((akk, item) => akk + item.quantity, 0)} товаров
            </Typography>
            <Promocode
              isActive={isPromoCodeActive}
              promocode={promocode}
              handleClickPromoCode={handleClickPromoCode}
              handlePromocodeChange={handlePromocodeChange}
            ></Promocode>
            <Box mt={10} className={styles.deliveryPrice}>
              <Typography
                // sx={{ color: 'primary.main', mt: 2, textDecoration: 'underline', cursor:'pointer' }}
                variant='h5'
                component='p'
                mr={8}
              >
                Доставка
              </Typography>
              <span className={styles.price}>
                <Typography variant='h4'>{delivery}</Typography>
                <sup>BYN</sup>
              </span>
            </Box>

            <Divider light sx={{ width: '100%', my: '20px' }} />

            <Box className={styles.deliveryPrice}>
              <Typography
                // sx={{ color: 'primary.main', mt: 2, textDecoration: 'underline', cursor:'pointer' }}
                variant='h5'
                component='p'
                mr={8}
              >
                Итого
              </Typography>
              <Typography
                component='div'
                sx={{
                  fontWeight: 700,
                }}
                className={styles.price}
              >
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {price + delivery}
                </Typography>
                <sup>BYN</sup>
              </Typography>
            </Box>
            {isCheckout ? (
              <Typography
                component={Link}
                href='/catalog'
                variant='h5'
                sx={{
                  textDecoration: 'underline',
                  mt: 10,
                }}
              >
                Вернуться в католог
              </Typography>
            ) : (
              <Button
                sx={{
                  mt: 10,
                  height: '36px',
                }}
                variant='contained'
                onClick={handleToCheckout}
              >
                К оформлению
              </Button>
            )}
          </Paper>
        </Box>

        {/* mobile version */}

        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <Typography sx={{ fontWeight: 700 }} variant='h4'>
            В корзине
          </Typography>
          <Typography
            sx={{ color: 'primary.main', my: '12px' }}
            variant='h5'
            component='p'
          >
            {bouquets.reduce((akk, item) => akk + item.quantity, 0)} товаров
          </Typography>

          {bouquets.map((bouquet) => (
            <Box key={bouquet.id}>
              <Divider />
              <Box
                sx={{
                  py: '14px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 3fr',
                  columnGap: 'max(30px,1.5vw)',
                }}
              >
                <Link href={`cart/${bouquet.slug.current}`}>
                  <Image
                    style={{ objectFit: 'cover' }}
                    layout='fill'
                    width={100}
                    height={125}
                    src={urlFor(bouquet.imagePath).width(400).url()}
                    alt='bouquet'
                  ></Image>
                </Link>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontSize: '16px' }}>
                    {bouquet.title}
                  </Typography>
                  <Box
                    sx={{ display: 'flex', mt: '10px', alignItems: 'center' }}
                  >
                    <Box sx={{ width: '100px', mr: '10px' }}>
                      <CounterButtons
                        id={bouquet.id}
                        value={bouquet.quantity}
                      />
                    </Box>
                    <Box className={styles.price} sx={{ mx: 'auto' }}>
                      <Typography
                        variant='h4'
                        sx={{ fontWeight: '700', color: '#000000' }}
                      >
                        {bouquet.price * bouquet.quantity}
                      </Typography>
                      <Box
                        sx={{ fontWeight: '700', color: '#000000' }}
                        component='sup'
                      >
                        BYN
                      </Box>
                    </Box>
                    <IconButton
                      component='div'
                      onClick={(e) => removeFromCart(e, bouquet.id)}
                      aria-label='CrossIcon'
                      // sx={{mr:'20px'}}
                    >
                      <Box
                        component={Cros}
                        sx={{ width: { ...size(18), xs: 18 } }}
                        viewBox='0 0 18 18'
                      ></Box>
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}

          <Box
            sx={{
              py: '14px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '20px',
              rowGap: '20px',
            }}
          >
            <Box
              className={styles.deliveryPrice}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                alignItems: 'center',
              }}
            >
              <Typography
                // sx={{ color: 'primary.main', mt: 2, textDecoration: 'underline', cursor:'pointer' }}
                variant='h5'
                component='p'
                mr={8}
              >
                Доставка
              </Typography>
              <Typography
                component='div'
                className={styles.price}
                sx={{ justifyContent: 'start' }}
              >
                <Typography variant='h4'>0</Typography>
                <Box component='sup' sx={{ fontWeight: '700' }}>
                  BYN
                </Box>
              </Typography>
            </Box>

            <Promocode
              isActive={isPromoCodeActive}
              promocode={promocode}
              handleClickPromoCode={handleClickPromoCode}
              handlePromocodeChange={handlePromocodeChange}
            ></Promocode>

            <Box
              className={styles.deliveryPrice}
              sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
            >
              <Typography
                // sx={{ color: 'primary.main', mt: 2, textDecoration: 'underline', cursor:'pointer' }}
                variant='h5'
                component='p'
                mr={8}
              >
                Итого
              </Typography>
              <Typography
                component='div'
                sx={{
                  fontWeight: 700,
                }}
                className={styles.price}
              >
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 700,
                    justifyContent: 'start',
                  }}
                >
                  {bouquets.reduce(
                    (akk, item) => akk + item.price * item.quantity,
                    0
                  )}
                </Typography>
                <Box component='sup' sx={{ fontWeight: '700' }}>
                  BYN
                </Box>
              </Typography>
            </Box>

            {isCheckout ? (
              <Typography
                component={Link}
                href='/catalog'
                variant='h5'
                sx={{
                  textDecoration: 'underline',
                  ml: 'auto',
                }}
              >
                Вернуться в католог
              </Typography>
            ) : (
              <Button
                variant='contained'
                onClick={handleToCheckout}
                sx={{
                  mt: 10,
                  height: '36px',
                }}
              >
                К оформлению
              </Button>
            )}
          </Box>
        </Box>

        {isCheckout && bouquets.length > 0 ? (
          <Checkout price={price}></Checkout>
        ) : null}
      </Box>
    </>
  );
}
