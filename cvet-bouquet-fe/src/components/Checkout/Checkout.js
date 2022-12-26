import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckoutsButtons from '../CheckoutsButtons/CheckoutsButtons';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import styles from './Checkout.module.css';
import ShopsList from '../ShopsList';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SuccsessModal from '../SuccsessModal';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import size from '../../utils/size';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ru } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { sanityClient } from '../../../sanity';
import checkoutSchema from '../../verifiedSchemas/checkout';
import generateOrderNumber from '../../utils/generateOrderNumber';
import addOrder from '../../utils/sanityMethods/addOrder';

export default function Checkout({ price, shopsList, orderlist }) {
  const [dateValue, setDateValue] = React.useState(dayjs(new Date()));
  const [isOpenSuccessModal, setIsOpenSuccessModal] = React.useState(false);

  const checkoutOptionsDefault = {
    delivery: true,
    selfReceive: true,
    paymentByCard: true,
  };

  const [delivery, setDelivery] = React.useState(shopsList[0].adress);
  const [checkoutOptions, setCtOptions] = React.useState(
    checkoutOptionsDefault
  );
  const [isPrivareHouse, setIsPrivareHouse] = React.useState(false);
  const [status, setStatus] = React.useState('В ожидании');

  const defaultState = {
    name: '',
    phone: '',
    email: '',
    comment: '',
    date: '',
    time: '',
    street: '',
    house: '',
    enter: '',
    floor: '',
    flat: '',
    orderlist: orderlist,
    OrderAmount: price,
    URL_RETURN_OK: 'https://cvet-bouquet-nicolay-kr.vercel.app/cart',
    Merchant_ID: 'Merchant_ID',
    OrderCurrency: 'BYN',
  };

  const handleDeliveryChange = (value) => {
    setCtOptions({ ...checkoutOptions, delivery: value });
  };
  const handleReceiveChange = (value) => {
    setCtOptions({ ...checkoutOptions, selfReceive: value });
  };
  const handlePaymentChange = (value) => {
    setCtOptions({ ...checkoutOptions, paymentByCard: value });
  };

  const handleChangeDeliveryAdress = (event) => {
    setDelivery(event.target.value);
  };

  const handleChangeIsPrivareHouse = (event) => {
    setIsPrivareHouse(event.target.checked);
  };

  const handleChange = (newValue) => {
    setDateValue(newValue);
  };

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: defaultState,
    // resolver: yupResolver(checkoutSchema),
  });

  const onSubmit = (data) => {
    let orderlist = data.orderlist
      .map((bouquet) => {
        return `${bouquet.title} количество: ${bouquet.quantity} `;
      })
      .join('; ');

    const doc = {
      status: status,
      name: data.name,
      phone: data.phone,
      email: data.email,
      orderlist: orderlist,
      comment: data.comment,
      date: checkoutOptions.delivery ? data.date.toLocaleDateString() : '',
      time: checkoutOptions.delivery
        ? data.time?.toTimeString().slice(0, 5)
        : '',
      street: data.street,
      house: data.house,
      enter: data.enter,
      floor: data.floor,
      flat: data.flat,
      deliveryType: checkoutOptions.delivery ? 'Курьер' : 'Самовывоз',
      deliveryPlace: !checkoutOptions.delivery ? delivery : '',
      recipient: checkoutOptions.selfReceive ? 'Сам клиент' : 'Другой человек',
      paymentType: checkoutOptions.paymentByCard ? 'Онлайн' : 'Наличные',
      OrderNumber: generateOrderNumber(),
      OrderAmount: `${data.OrderAmount}`,
      registration: new Date(),
    };
    // setIsOpenSuccessModal(true);

    fetch('https://formspree.io/f/xbjerqyo', {
      method: 'POST',
      body: JSON.stringify(doc),
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });

    // setIsOpenSuccessModal(true);
    addOrder(doc);

    const paymentData = {
      OrderNumber: data.orderNumber,
      OrderAmount: data.OrderAmount,
      URL_RETURN_OK: data.URL_RETURN_OK,
      Merchant_ID: data.Merchant_ID,
      OrderCurrency: data.OrderCurrency,
    };

    // fetch('https://<SERVER-NAME>/pay/order.cfm', {
    //   method: 'POST',
    //   body: JSON.stringify(paymentData),
    //   headers: {
    //     Accept: 'application/json',
    //   },
    // })
    //   .then((response) => {
    //     console.log('response', response);
    //   })
    //   .catch((error) => {
    //     console.log('error', error);
    //   });
  };

  const onClose = () => {
    setIsOpenSuccessModal(false);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={ru}
      // adapterLocale={localeMap.ru}
    >
      <SuccsessModal
        onClose={onClose}
        open={isOpenSuccessModal}
      ></SuccsessModal>

      <Box
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: { xs: '100%', lg: '60%' },
          mt: size(80),
          display: 'grid',
          rowGap: 'max(50px,2.6vw)',
        }}
      >
        <input type='hidden' {...register('Merchant_ID')} />
        <input type='hidden' {...register('OrderAmount')} />
        <input type='hidden' {...register('OrderCurrency')} />
        <input type='hidden' {...register('OrderCurrency')} />
        <CheckoutsButtons
          title={'Выберите, кто будет получать заказ'}
          leftBtnTitle={'Я сам (а)'}
          leftBtnSubtitle={'Заказ будет достален Вам лично'}
          rightBtnTitle={'Другой человек'}
          rightBtnSubtitle={'Заказ будет достален другому человеку'}
          handleClick={handleReceiveChange}
        ></CheckoutsButtons>

        {checkoutOptions.selfReceive ? (
          <Box width='100%'>
            <Typography variant='h3' color='#000000'>
              Ваши данные
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '3fr 3fr' },
                gridTemplateRows: 'auto',
                columnGap: 'max(30px,1.5vw)',
                rowGap: 'max(20px,1vw)',
                mt: 'max(20px,1vw)',
              }}
            >
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='Вашe имя'
                    id='name'
                    error={errors.name?.message.length > 0}
                    helperText={errors.name?.message}
                    {...field}
                  />
                )}
              />
              {/* <TextField id='customer-name' label='Ваше имя' /> */}
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <TextField
                    id='phone'
                    label='Ваш номер телефона.'
                    error={errors.phone?.message.length > 0}
                    helperText={errors.phone?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    id='email'
                    label='Ваш e-mail'
                    {...field}
                    error={errors.email?.message.length > 0}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Box>
          </Box>
        ) : (
          <Box width='100%'>
            <Typography variant='h3' color='#000000'>
              Данные получателя
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '3fr 3fr' },
                gridTemplateRows: 'auto',
                columnGap: 'max(30px,1.5vw)',
                rowGap: 'max(20px,1vw)',
                mt: 'max(20px,1vw)',
              }}
            >
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='Имя получателя'
                    id='name'
                    error={errors.name?.message.length > 0}
                    helperText={errors.name?.message}
                    {...field}
                  />
                )}
              />
              {/* <TextField id='customer-name' label='Имя получателя' /> */}
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <TextField
                    id='phone'
                    label='Номер телефона получателя'
                    error={errors.phone?.message.length > 0}
                    helperText={errors.phone?.message}
                    {...field}
                  />
                )}
              />
              {/* <TextField
                id='customer-telephone'
                label='Номер телефона получателя'
              /> */}
            </Box>
          </Box>
        )}

        <CheckoutsButtons
          title={'Доставка'}
          leftBtnTitle={'Доставка'}
          rightBtnTitle={'Самовывоз'}
          handleClick={handleDeliveryChange}
        ></CheckoutsButtons>

        {checkoutOptions.delivery ? (
          <Box width='100%'>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '3fr 3fr',
                gridTemplateRows: 'auto',
                columnGap: 'max(30px,1.5vw)',
                rowGap: 'max(20px,1vw)',
                mt: 'max(20px,1vw)',
                '& button': { fontSize: '16px !important' },
              }}
            >
              <Controller
                name='date'
                control={control}
                render={({ field }) => (
                  // <DesktopDatePicker
                  <DatePicker
                    sx={{
                      fontSize: '16px',
                      backGroundColor: 'red',
                      '& button': { fontSize: '16px !important' },
                    }}
                    label='Выберите дату'
                    inputFormat='dd/MM/yyyy'
                    value={dateValue}
                    onChange={(newValue) => {
                      setDateValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    {...field}
                  />
                )}
              />
              <Controller
                name='time'
                control={control}
                render={({ field }) => (
                  <TimePicker
                    label='Выберите время'
                    value={dateValue}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    className={styles.datePicker}
                    {...field}
                  />
                )}
              />

              <Controller
                name='street'
                control={control}
                render={({ field }) => (
                  <TextField
                    id='street'
                    label='Улица'
                    error={errors.street?.message.length > 0}
                    helperText={errors.street?.message}
                    {...field}
                  />
                )}
              />

              {/* <TextField id='customer-time' label='Выберите время' /> */}
              {/* <TextField id='customer-street' label='Улица' /> */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                }}
              >
                {/* <TextField id='customer-house' label='Дом' /> */}
                <Controller
                  name='house'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id='house'
                      label='Дом'
                      error={errors.house?.message.length > 0}
                      helperText={errors.house?.message}
                      {...field}
                    />
                  )}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Switch
                    label='Частный дом'
                    checked={isPrivareHouse}
                    onChange={handleChangeIsPrivareHouse}
                    // inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <Typography variant='body1' color='#000000'>
                    Частный дом
                  </Typography>
                </Box>
              </Box>
              {!isPrivareHouse ? (
                <>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr',
                      gridTemplateRows: 'auto',
                      columnGap: 'max(30px,1.5vw)',
                    }}
                  >
                    <Controller
                      name='enter'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id='enter'
                          label='Подъезд'
                          error={errors.enter?.message.length > 0}
                          helperText={errors.enter?.message}
                          {...field}
                        />
                      )}
                    />
                    {/* <TextField id='customer-enter' label='Подъезд' /> */}
                    <Controller
                      name='floor'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id='floor'
                          label='Этаж'
                          error={errors.floor?.message.length > 0}
                          helperText={errors.floor?.message}
                          {...field}
                        />
                      )}
                    />
                    {/* <TextField id='customer-floor' label='Этаж' /> */}
                  </Box>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gridTemplateRows: 'auto',
                    }}
                  >
                    <Controller
                      name='flat'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          sx={{ gridColumn: { xs: '1/3', lg: '1' } }}
                          id='flat'
                          label='Квартира'
                          error={errors.flat?.message.length > 0}
                          helperText={errors.flat?.message}
                          {...field}
                        />
                      )}
                    />
                    {/* <TextField
                      sx={{ gridColumn: { xs: '1/3', lg: '1' } }}
                      id='customer-flat'
                      label='Квартира'
                    /> */}
                  </Box>
                </>
              ) : null}
            </Box>
          </Box>
        ) : (
          <FormControl>
            {shopsList.map((shop, index) => {
              if (shop.published) {
                return (
                  <FormControlLabel
                    key={index}
                    sx={{ mb: '20px' }}
                    value={shop.adress}
                    control={<Radio checked={delivery === shop.adress} />}
                    onChange={handleChangeDeliveryAdress}
                    label={
                      <ShopsList shop={shop} delivery={delivery}></ShopsList>
                    }
                  />
                );
              }
            })}
          </FormControl>
        )}
        <Controller
          name='comment'
          control={control}
          render={({ field }) => (
            <TextField
              multiline
              style={{ height: '100%' }}
              sx={{
                mt: '0',
                '& div': { height: '100%' },
                '& textarea': { height: '100% !important' },
              }}
              rows={6}
              id='comment'
              label={'Комментарии к заказу, текст для открытки'}
              {...field}
            />
          )}
        />

        <CheckoutsButtons
          title={'Выберите способ оплаты'}
          leftBtnTitle={'Банковская карта'}
          rightBtnTitle={'Наличные'}
          handleClick={handlePaymentChange}
        ></CheckoutsButtons>

        <Box
          sx={{
            width: '100%',
            height: 'max(60px,0.73vw)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: 'max(30px,3.1vw)',
          }}
        >
          <Button
            type='submit'
            sx={{ mt: 'max(10px,0.05vw)', gridColumn: { xs: '1/3', lg: '1' } }}
            variant='contained'
          >
            Оформить заказ
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}