import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/future/image';
import metroIcon from '../../../public/assets/icons/metro.svg';
import CheckoutsButtons from '../CheckoutsButtons/CheckoutsButtons';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styles from './Checkout.module.css';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import ShopsList from '../ShopsList';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SuccsessModal from '../SuccsessModal';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function Checkout({price}) {
  const [dateValue, setDateValue] = React.useState(dayjs(new Date()));
  const [isOpenSuccessModal, setIsOpenSuccessModal] = React.useState(false);

  const defaultSchema = yup
    .object({
      customerName: yup.string().required('Это поле должно быть заполнено'),
      customerPhone: yup.string().required('Это поле должно быть заполнено'),
      customerSumma: yup
        .number()
        .required('Это поле должно быть заполнено')
        .typeError('Это поле должно быть в числовом формате. Пример: 2000'),
      customerEmail: yup
        .string()
        .email('E-mail введен не корректно')
        .required('Это поле должно быть заполнено'),
      customerStreet: yup.string().required('Это поле должно быть заполнено'),
      customerHouse: yup.string().required('Это поле должно быть заполнено'),
      customerFlat: yup.string().required('Это поле должно быть заполнено'),
      // customerDate: yup.string().required('Это поле должно быть заполнено'),
      // customerTime: yup.string().required('Это поле должно быть заполнено'),
    })
    .required();

  const shopsList = [
    {
      adress: 'г. Минск, пр. Победителей, 27, Славянский квартал',
      time: 'Время работы: пн-вс 9:00-21:00',
      metro: 'Немига',
    },
    {
      adress: 'г. Минск, пр. Независимости, 104',
      time: 'Время работы: пн-вс 9:00-21:00',
      metro: 'Московская',
    },
  ];

  const checkoutOptionsDefault = {
    delivery: true,
    selfReceive: true,
    paymentByCard: true,
  };

  const [delivery, setDelivery] = React.useState(shopsList[0].adress);
  const [checkoutOptions, setCtOptions] = React.useState(
    checkoutOptionsDefault
  );

  const defaultState = {
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerComment: '',
    customerDate: '',
    customerTime: '',
    customerStreet: '',
    customerHouse: '',
    customerEnter: '',
    customerFloor: '',
    customerFlat: '',
    price:price,
  };
  console.log(checkoutOptions)

  const [isPrivareHouse, setIsPrivareHouse] = React.useState(false);

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

  const localeMap = {
    en: enLocale,
    ru: ruLocale,
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultState,
    // resolver: yupResolver(defaultSchema),
  });

  const onSubmit = (data) => {
    setIsOpenSuccessModal(true);
    console.log(Object.assign(data, checkoutOptions));
  };

  const onClose = () => {
    setIsOpenSuccessModal(false);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={localeMap.ru}
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
          my: 'max(80px,4.2vw)',
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
                name='customerName'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='Вашe имя'
                    id='customerName'
                    error={errors.customerName?.message.length > 0}
                    helperText={errors.customerName?.message}
                    {...field}
                  />
                )}
              />
              {/* <TextField id='customer-name' label='Ваше имя' /> */}
              <Controller
                name='customerPhone'
                control={control}
                render={({ field }) => (
                  <TextField
                    id='customerPhone'
                    label='Ваш номер телефона.'
                    error={errors.customerPhone?.message.length > 0}
                    helperText={errors.customerPhone?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name='customerEmail'
                control={control}
                render={({ field }) => (
                  <TextField
                    id='customerEmail'
                    label='Ваш e-mail'
                    {...field}
                    error={errors.customerEmail?.message.length > 0}
                    helperText={errors.customerEmail?.message}
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
                name='customerName'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='Имя получателя'
                    id='customerName'
                    error={errors.customerName?.message.length > 0}
                    helperText={errors.customerName?.message}
                    {...field}
                  />
                )}
              />
              {/* <TextField id='customer-name' label='Имя получателя' /> */}
              <Controller
                name='customerPhone'
                control={control}
                render={({ field }) => (
                  <TextField
                    id='customerPhone'
                    label='Номер телефона получателя'
                    error={errors.customerPhone?.message.length > 0}
                    helperText={errors.customerPhone?.message}
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
                name='customerDate'
                control={control}
                render={({ field }) => (
                  <DesktopDatePicker
                    sx={{
                      fontSize: '16px',
                      '& button': { fontSize: '16px !important' },
                    }}
                    label='Выберите дату'
                    inputFormat='DD/MM/YYYY'
                    value={dateValue}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    // error={errors.customerDate?.message.length > 0}
                    // helperText={errors.customerDate?.message}
                    // className={styles.datePicker}
                    {...field}
                  />
                )}
              />
              <Controller
                name='customerTime'
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
              {/* <DesktopDatePicker
                sx={{
                  fontSize: '16px',
                  '& button': { fontSize: '16px !important' },
                }}
                label='Выберите дату'
                inputFormat='DD/MM/YYYY'
                value={dateValue}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                className={styles.datePicker}
              /> */}
              {/* <TextField type="date" inputFormat='DD/MM/YYYY' id='customer-date' value={dateValue}  /> */}

              {/* <Controller
                name='customerTime'
                control={control}
                render={({ field }) => (
                  <TextField
                    id='customerTime'
                    label='Выберите время'
                    error={errors.customerTime?.message.length > 0}
                    helperText={errors.customerTime?.message}
                    {...field}
                  />
                )}
              /> */}
              <Controller
                name='customerStreet'
                control={control}
                render={({ field }) => (
                  <TextField
                    id='customerStreet'
                    label='Улица'
                    error={errors.customerStreet?.message.length > 0}
                    helperText={errors.customerStreet?.message}
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
                  name='customerHouse'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id='customerHouse'
                      label='Дом'
                      error={errors.customerHouse?.message.length > 0}
                      helperText={errors.customerHouse?.message}
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
                      name='customerEnter'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id='customerEnter'
                          label='Подъезд'
                          error={errors.customerEnter?.message.length > 0}
                          helperText={errors.customerEnter?.message}
                          {...field}
                        />
                      )}
                    />
                    {/* <TextField id='customer-enter' label='Подъезд' /> */}
                    <Controller
                      name='customerFloor'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id='customerFloor'
                          label='Этаж'
                          error={errors.customerFloor?.message.length > 0}
                          helperText={errors.customerFloor?.message}
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
                      name='customerFlat'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          sx={{ gridColumn: { xs: '1/3', lg: '1' } }}
                          id='customerFlat'
                          label='Квартира'
                          error={errors.customerFlat?.message.length > 0}
                          helperText={errors.customerFlat?.message}
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
            {shopsList.map((shop, index) => (
              <FormControlLabel
                key={index}
                sx={{ mb: '20px' }}
                value={shop.adress}
                control={<Radio checked={delivery === shop.adress} />}
                onChange={handleChangeDeliveryAdress}
                label={<ShopsList shop={shop} delivery={delivery}></ShopsList>}
              />
            ))}
          </FormControl>
        )}
         <Controller
                name='customerComment'
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
                    id='customerComment'
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
