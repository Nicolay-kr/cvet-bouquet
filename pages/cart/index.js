import React from 'react';
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
import BreadCrumbs from '../../src/components/Breadcrubs/BreadCrumbs';
import { sanityClient, urlFor } from '../../sanity';
import { useRouter } from 'next/router';
import Head from 'next/head';
import size from '../../src/utils/size';
import Promocode from '../../src/components/Promocode/Promocode';
import EmptyCart from '../../src/components/EmptyCart/EmptyCart';
import CartRow from '../../src/components/CartRow/CartRow';

export default function Cart({ data }) {
  const bouquetsContext = useAppContext();
  const bouquets = bouquetsContext.bouquetsInCarts;
  const router = useRouter();
  const [isCheckout, setIsCheckout] = React.useState(
    router.query.isCheckout ? router.query.isCheckout : false
  );
  const [promoCodeValue, setPromoCodeValue] = React.useState(null);

  const orderlist = bouquets
    .map((bouquet) => {
      return `${bouquet.title} количество: ${bouquet.quantity} `;
    })
    .join('; ');

  const handleToCheckout = () => {
    setIsCheckout(true);
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

  const orderSumma =
    promoCodeValue && promoCodeValue.percent
      ? +(price + delivery) -
        +((price + delivery) * (promoCodeValue.percent / 100)).toFixed(2)
      : +(price + delivery);

  return (
    <>
      <Head>
        <title>Корзина | ЦВЕТ•БУКЕТ</title>
      </Head>

      {bouquets.length ? (
        <Box
          sx={{
            px: { xs: '5%', lg: '10%' },
            pb: 10,
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', lg: 'grid' },
              gridTemplateColumns: { sx: '1fr', lg: '8fr 3fr' },
              columnGap: 'max(30px,1.5vw)',
              rawGap: 'max(30px,1.5vw)',
            }}
          >
            <Box>
              <BreadCrumbs
                breadCrumbsList={breadCrumbsList}
                isInIntro={true}
              ></BreadCrumbs>
              <TableContainer
                sx={{ width: '100%', mb: '24px' }}
                component='div'
              >
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: '40%' }}></TableCell>
                      <TableCell sx={{ fontSize: size(20), color:'#7C7975' }} align='center'>Цена</TableCell>
                      <TableCell sx={{ fontSize: size(20), color:'#7C7975' }} align='center'>Количество</TableCell>
                      <TableCell sx={{ fontSize: size(20), color:'#7C7975' }} align='center'>Сумма</TableCell>
                      <TableCell sx={{ fontSize: size(20), color:'#7C7975' }} align='center'></TableCell>
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
                ml: { sm: '10%' },
                bgcolor: 'fon.main',
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                px: size(60),
                pt: size(84),
                pb: size(40),
              }}
              elevation={3}
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
              <Promocode setPromoCodeValue={setPromoCodeValue}></Promocode>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  columnGap: size(30),
                  width: '100%',
                  mt: size(40),
                }}
              >
                <Typography variant='h5' component='p'>
                  Доставка
                </Typography>
                <Box component='span' sx={{display:'flex'}}>
                  <Typography variant='h4'>{delivery}</Typography>
                  <sup>BYN</sup>
                </Box>
              </Box>
              {promoCodeValue ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: '100%',
                    alignItems:'center',
                  }}
                >
                  <Typography variant='h5' component='p' mr={8}>
                    Промокод{' '}
                    <Box component='span' sx={{ fontWeight: '600' }}>
                      {promoCodeValue.code}
                    </Box>
                  </Typography>
                  <Box component='span' sx={{display:'flex', justifyContent: 'center'}}>
                    <Typography variant='h4'>
                      -
                      {(
                        (price + delivery) *
                        (promoCodeValue.percent / 100)
                      ).toFixed(2)}
                    </Typography>
                    <sup>BYN</sup>
                  </Box>
                </Box>
              ) : null}

              <Divider light sx={{ width: '100%', my: '20px' }} />

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  columnGap: size(30),
                  
                  width: '100%',
                }}
              >
                <Typography variant='h5' component='p' >
                  Итого
                </Typography>
                <Typography
                  component='div'
                  sx={{
                    display:'flex',
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant='h4'
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {orderSumma}
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
                    borderBottom: '1px solid transparent',
                    '&:hover': {
                      borderBottom: '1px solid ',
                    },
                    textDecoration: 'none',
                    mt: size(40),
                  }}
                >
                  Вернуться в каталог
                </Typography>
              ) : (
                <Button
                  sx={{
                    mt: size(40),
                    height: size(48),
                    width: '100%',
                    fontSize: size(20),
                    fontWeight: '600',
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
            <BreadCrumbs
              breadCrumbsList={breadCrumbsList}
              isInIntro={true}
            ></BreadCrumbs>
          </Box>

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
                  <Link href={{
              pathname: `/catalog/products/${bouquet?.slug?.current}`,
              query: { category: 'cart'}
            }}>
                    <Image
                      style={{ objectFit: 'cover' }}
                      layout='fill'
                      width={100}
                      height={125}
                      src={urlFor(bouquet.imagePath)?.width(400)?.url()}
                      alt='bouquet'
                    ></Image>
                  </Link>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5'>{bouquet.title}</Typography>
                    <Box
                      sx={{ display: 'flex', mt: '10px', alignItems: 'center' }}
                    >
                      <Box sx={{ width: '100px', mr: '10px' }}>
                        <CounterButtons
                          id={bouquet.id}
                          value={bouquet.quantity}
                        />
                      </Box>
                      <Box sx={{display:'flex', justifyContent: 'center', mx: 'auto' }}>
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
                gridTemplateColumns: '1fr',
                columnGap: '20px',
                rowGap: '20px',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  columnGap: 20,
                  mt:10,
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    alignItems: 'center',
                    columnGap:size(40),
                  }}
                >
                  <Typography variant='h5' component='p' mr={8}>
                    Доставка
                  </Typography>
                  <Box sx={{ display: 'flex', mx: '0' }}>
                    <Typography variant='h4'>{delivery}</Typography>
                    <sup>BYN</sup>
                  </Box>
                </Box>

                <Box sx={{ ml: 'auto' }}>
                  <Promocode setPromoCodeValue={setPromoCodeValue}></Promocode>
                </Box>
              </Box>

              {promoCodeValue ? (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                     <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    alignItems: 'center',
                    columnGap:size(40),
                  }}
                >
                  <Typography variant='h5' component='p' mr={8}>
                  Промокод
                  </Typography>
                  <Typography variant='h5'  sx={{ fontWeight: '600' }}>
                      {promoCodeValue.code}
                    </Typography>
                </Box>
                  <Box component='span' sx={{display:'flex', justifyContent: 'end'}}>
                    <Typography variant='h4'>
                      -
                      {(
                        (price + delivery) *
                        (promoCodeValue.percent / 100)
                      ).toFixed(2)}
                    </Typography>
                    <sup>BYN</sup>
                  </Box>
                </Box>
              ) : null}

              <Divider light sx={{ width: '100%', my: '10px' }} />

              <Box
                sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr',columnGap:size(40) }}
              >
                <Typography
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
                    mx: '0',
                    display:'flex', justifyContent: 'end',
                  }}
                >
                  <Typography
                    variant='h4'
                    sx={{
                      display:'flex',
                      fontWeight: 700,
                      justifyContent: 'start',
                    }}
                  >
                    {orderSumma.toFixed(2)}
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
                    m:'auto',
                    ml: 'auto',
                  }}
                >
                  Вернуться в каталог
                </Typography>
              ) : (
                <Button
                  variant='contained'
                  onClick={handleToCheckout}
                  sx={{
                    mt: 10,
                    height: '48px',
                    width: { xs: '100%', sm: '200px' },
                    ml: { xs: '0', sm: 'auto' },
                    fontSize: 18,
                    fontWeight:'600'
                  }}
                >
                  К оформлению
                </Button>
              )}
            </Box>
          </Box>

          {isCheckout && bouquets.length > 0 ? (
            <Checkout
              price={orderSumma.toFixed(2)}
              shopsList={data?.generalInfo?.shopsList}
              orderlist={orderlist}
              promocode={promoCodeValue?.code? promoCodeValue?.code:''}
              payments={data?.generalInfo?.payments}
            ></Checkout>
          ) : null}
        </Box>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = `{
    "generalInfo":*[ _type == "generalInfo"][0]
    {
      _id,
      phone,
      email,
      instagram,
      worktime,
      shopsList[],
      payments,
    }
  }`;

  const data = await sanityClient.fetch(query);

  if (!data) {
    return {
      props: {
        data: {},
      },
    };
  } else {
    return {
      props: {
        data,
      },
    };
  }
};
