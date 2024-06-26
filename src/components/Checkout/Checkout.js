import React from 'react';
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
import ShopsList from '../ShopsList/ShopsList';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SuccsessModal from '../SuccsessModal/SuccsessModal';
import size from '../../utils/size';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ru as ruLocale } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import checkoutSchema from '../../verifiedSchemas/checkout';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ru from 'react-phone-input-2/lang/ru.json';
import PaymentForm from '../PaymentForm/PaymentForm';
import Link from '../CustopNextComponents/Link';
import { useAppContext } from '../context/BouquetsContext';
import Snackbar from '@mui/material/Snackbar';

const MenuProps = {
  PaperProps: {
    style: {
      height: 300,
    },
  },
};

const deliveryIntervals = [
  '9.00 - 10.00',
  '10.00 - 11.00',
  '11.00 - 12.00',
  '12.00 - 13.00',
  '13.00 - 14.00',
  '14.00 - 15.00',
  '15.00 - 16.00',
  '16.00 - 17.00',
  '17.00 - 18.00',
  '18.00 - 19.00',
  '19.00 - 20.00',
  '20.00 - 21.00',
  '21.00 - 22.00',
];

export default function Checkout({
  price,
  shopsList,
  orderlist,
  promocode,
  payments,
}) {
  const [dateValue, setDateValue] = React.useState(dayjs(new Date()));
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [formProcessing, setFormProcessing] = React.useState(false);
  const [OrderNumber, setOrderNumber] = React.useState('');
  const [OrderAmount, setOrderAmount] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const bouquetsContext = useAppContext();

  const [time, setTime] = React.useState('');

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const checkoutOptionsDefault = {
    delivery: true,
    selfReceive: true,
    paymentByCard: true,
  };

  const [delivery, setDelivery] = React.useState(shopsList[0].adress);
  const [checkoutOptions, setCheckoutOptions] = React.useState(
    checkoutOptionsDefault
  );
  const [isPrivareHouse, setIsPrivareHouse] = React.useState(false);
  const [isOpenSnack, setIsOpenSnack] = React.useState(false);

  const defaultState = {
    name: '',
    recipientName: '',
    recipientPhone: '',
    phone: '',
    email: '',
    comment: '',
    date: '',
    street: '',
    house: '',
    enter: '',
    floor: '',
    flat: '',
  };

  const handleDeliveryChange = (value) => {
    setCheckoutOptions({ ...checkoutOptions, delivery: value });
  };
  const handleReceiveChange = (value) => {
    setCheckoutOptions({ ...checkoutOptions, selfReceive: value });
  };
  const handlePaymentChange = (value) => {
    setCheckoutOptions({ ...checkoutOptions, paymentByCard: value });
  };

  const handleChangeDeliveryAdress = (event) => {
    setDelivery(event.target.value);
  };

  const handleChangeIsPrivareHouse = (event) => {
    setIsPrivareHouse(event.target.checked);
  };

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultState,
    resolver: yupResolver(
      checkoutSchema(
        checkoutOptions.selfReceive,
        isPrivareHouse,
        !checkoutOptions.delivery
      )
    ),
  });

  const onSubmit = async (data) => {
    if (!payments.paymentsOff) {
      setFormProcessing(true);
      setIsOpenModal(true);

      const orderData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        orderlist: orderlist,
        comment: data.comment,
        date: checkoutOptions.delivery ? dateValue.format('DD-MM-YYYY') : '',
        time: time,
        street: data.street,
        house: data.house,
        enter: data.enter,
        floor: data.floor,
        flat: data.flat,
        deliveryType: checkoutOptions.delivery ? 'Курьер' : 'Самовывоз',
        deliveryPlace: !checkoutOptions.delivery ? delivery : '',
        recipientName: !checkoutOptions.selfReceive
          ? data.recipientName
          : data.name,
        recipientPhone: !checkoutOptions.selfReceive
          ? data.recipientPhone
          : data.phone,
        paymentType: checkoutOptions.paymentByCard
          ? 'Онлайн оплата'
          : 'Наличные',
        OrderAmount: price,
        registration: new Date(),
        orderType: 'Заказ через корзину',
        promocode,
      };
      try {
        const response = await fetch('api/createOrder', {
          method: 'POST',
          body: JSON.stringify(orderData),
          headers: {
            Accept: 'application/json',
          },
        });

        if (orderData.paymentType === 'Наличные') {
          setFormProcessing(false);
          setIsOpenModal(true);
          reset(defaultState);
        } else {
          const newdata = await response.json();
          localStorage.setItem(
            'lastOrder',
            newdata.data.OrderNumber.toString()
          );
          setOrderNumber(`${newdata.data.OrderNumber}`);
          setOrderAmount(`${newdata.data.OrderAmount}`);
          setEmail(`${newdata.data.email}`);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      // setFormProcessing(true);
      setIsOpenModal(true);
    }
  }

  const onClose = () => {
    setIsOpenModal(false);
    if(!payments.paymentsOff){
      bouquetsContext.clearCart();
    }
  };
  const onError = (errors, e) => setIsOpenSnack(true);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenSnack(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
      <SuccsessModal
        onClose={payments.paymentsOff || !checkoutOptions.paymentByCard? onClose:null}
        open={isOpenModal}
        formProcessing={formProcessing}
        title={checkoutOptions.paymentByCard? payments.title :'Ваш заказ отправлен'}
        text={checkoutOptions.paymentByCard? payments.text :'Спасибо что воспользовались услугами нашего магазина'}
      ></SuccsessModal>
        <Snackbar
          autoHideDuration={1000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isOpenSnack}
          message='Проверьте заполненные данные'
          onClose={handleCloseSnackbar}
        />

      <Box
        component={'form'}
        onSubmit={handleSubmit(onSubmit, onError)}
        sx={{
          width: { xs: '100%', lg: '60%' },
          mt: size(80),
          display: 'grid',
          rowGap: 'max(50px,2.6vw)',
        }}
      >
        <CheckoutsButtons
          title={'Выберите, кто будет получать заказ'}
          leftBtnTitle={'Я сам (а)'}
          leftBtnSubtitle={'Заказ будет достален Вам лично'}
          rightBtnTitle={'Другой человек'}
          rightBtnSubtitle={'Заказ будет достален другому человеку'}
          handleClick={handleReceiveChange}
        ></CheckoutsButtons>

        <Box width='100%'>
          <Typography variant='h3' color='#000000'>
            Ваши данные
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '3fr 3fr' },
              gridTemplateRows: 'auto',
              columnGap: { ...size(30), xs: 16 },
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
            <Controller
              control={control}
              name='phone'
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <PhoneInput
                  {...field}
                  inputExtraProps={{
                    ref,
                    required: true,
                    autoFocus: true,
                  }}
                  containerStyle={{
                    marginBottom:
                      errors.phone?.message?.length > 0 ? '20px' : 0,
                    marginTop: '0',
                  }}
                  country={'by'}
                  preferredCountries={['by','ru','ua','pl','lt','lv','ee']}
                  preserveOrder={"preferredCountries"}
                  value={field.value}
                  localization={ru}
                  placeholder='Ваш номер телефона.'
                  isValid={() => !(errors.phone?.message.length > 0)}
                  defaultErrorMessage={`${
                    errors.phone?.message ? errors.phone?.message : ''
                  }`}
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
        {!checkoutOptions.selfReceive ? (
          <Box width='100%'>
            <Typography variant='h3' color='#000000'>
              Данные получателя
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '3fr 3fr' },
                gridTemplateRows: 'auto',
                columnGap: { ...size(30), xs: 16 },
                rowGap: 'max(20px,1vw)',
                mt: 'max(20px,1vw)',
              }}
            >
              <Controller
                name='recipientName'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='Имя получателя'
                    id='recipientName'
                    error={errors.recipientName?.message.length > 0}
                    helperText={errors.recipientName?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name='recipientPhone'
                rules={{ required: true }}
                render={({ field: { ref, ...field } }) => (
                  <PhoneInput
                    {...field}
                    inputExtraProps={{
                      ref,
                      required: true,
                      autoFocus: true,
                    }}
                    containerStyle={{
                      marginBottom:
                        errors.recipientPhone?.message?.length > 0 ? '20px' : 0,
                      marginTop: '0',
                    }}
                    country={'by'}
                    value={field.value}
                    localization={ru}
                    placeholder='Ваш номер телефона.'
                    isValid={() => !(errors.recipientPhone?.message.length > 0)}
                    defaultErrorMessage={`${
                      errors.recipientPhone?.message
                        ? errors.recipientPhone?.message
                        : ''
                    }`}
                  />
                )}
              />
            </Box>
          </Box>
        ) : null}

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
                columnGap: { ...size(30), xs: 16 },
                rowGap: 'max(20px,1vw)',
                mt: 'max(20px,1vw)',
                '& button': { fontSize: '16px !important' },
              }}
            >
              <DatePicker
                label='Выберите дату'
                inputFormat='dd/MM/yyyy'
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(dayjs(newValue));
                }}
                renderInput={(params) => <TextField {...params} />}
              />

              <FormControl
                fullWidth
                sx={{ '& ul': { height: '300px !important' } }}
              >
                <InputLabel id='demo-simple-select-label'>
                  Выберите время
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={time}
                  label='Выберите время'
                  onChange={handleChangeTime}
                  MenuProps={MenuProps}
                >
                  {deliveryIntervals.map((interval) => {
                    return (
                      <MenuItem
                        key={interval}
                        sx={{ fontSize: size(24) }}
                        value={interval}
                      >
                        {interval}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

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
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                }}
              >
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
                    checked={isPrivareHouse}
                    onChange={handleChangeIsPrivareHouse}
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
                      columnGap: { ...size(30), xs: 16 },
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
            height: { ...size(60), xs: 48 },
            mt: 'max(10px,0.05vw)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: 'max(30px,3.1vw)',
          }}
        >
          <Button
            type='submit'
            sx={{
              gridColumn: { xs: '1/3', lg: '1' },
              fontSize: { ...size(24), xs: 18 },
              fontWeight: '600',
            }}
            variant='contained'
          >
            Оформить заказ
          </Button>
        </Box>
        <Typography
          variant='h6'
          component='p'
          color='#000000'
          sx={{
            fontWeight: '700',
            marginTop: 'auto',
            width: '100%',
            fontSize: { ...size(18), xs: 12 },
          }}
        >
          Отправляя заявку, вы принимаете{' '}
          <Box
            component={Link}
            sx={{
              color: '#8C7B5F',
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
            href='/privacy'
          >
            соглашение об обработке персональных данных, политику
            конфиденциальности и договор оферты
          </Box>
        </Typography>
      </Box>
      <PaymentForm
        OrderNumber={OrderNumber}
        OrderAmount={OrderAmount}
        Email={Email}
      ></PaymentForm>
    </LocalizationProvider>
  );
}
