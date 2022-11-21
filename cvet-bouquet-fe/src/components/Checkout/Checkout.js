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
import ruLocale from "date-fns/locale/ru";
import enLocale from "date-fns/locale/en-US";

export default function Checkout() {
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

  const [dateValue, setDateValue] = React.useState(dayjs(new Date()));

  const handleChange = (newValue) => {
    setDateValue(newValue);
  };

  const localeMap = {
    en: enLocale,
    ru: ruLocale,
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={localeMap.ru}>
      <Box
        sx={{
          width: '60%',
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
            <Typography variant='h3' color='initial'>
              Ваши данные
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '3fr 3fr',
                gridTemplateRows: 'auto',
                columnGap: 'max(30px,1.5vw)',
                rowGap: 'max(20px,1vw)',
                mt: 'max(20px,1vw)',
              }}
            >
              <TextField id='customer-name' label='Ваше имя' />
              <TextField
                id='customer-telephone'
                label='Ваш номер телефона'
                sx={{ gridColumnStart: 1 }}
              />
              <TextField id='customer-email' label='Ваш e-mail' />
            </Box>
          </Box>
        ) : (
          <Box width='100%'>
            <Typography variant='h3' color='initial'>
              Данные получателя
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '3fr 3fr',
                gridTemplateRows: 'auto',
                columnGap: 'max(30px,1.5vw)',
                rowGap: 'max(20px,1vw)',
                mt: 'max(20px,1vw)',
              }}
            >
              <TextField id='customer-name' label='Имя получателя' />
              <TextField
                id='customer-telephone'
                label='Номер телефона получателя'
              />
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
                '& button': { fontSize: '16px !important' }
              }}
            >
              <DesktopDatePicker
                sx={{ fontSize: '16px', '& button': { fontSize: '16px !important' } }}
                label='Выберите дату'
                inputFormat='DD/MM/YYYY'
                value={dateValue}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                className={styles.datePicker}
              />
              {/* <TextField type="date" inputFormat='DD/MM/YYYY' id='customer-date' value={dateValue}  /> */}
              <TextField id='customer-time' label='Выберите время' />
              <TextField id='customer-street' label='Улица' />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                }}
              >
                <TextField id='customer-house' label='Дом' />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Switch
                    label='Частный дом'
                    checked={isPrivareHouse}
                    onChange={handleChangeIsPrivareHouse}
                    // inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <Typography variant='body1' color='initial'>
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
                    <TextField id='customer-enter' label='Подъезд' />
                    <TextField id='customer-floor' label='Этаж' />
                  </Box>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gridTemplateRows: 'auto',
                    }}
                  >
                    <TextField id='customer-flat' label='Квартира' />
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
                label={
                  <>
                    <Typography
                      sx={{
                        alignSelf: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '0px',
                        opacity: delivery === shop.adress ? '1' : '0.5',
                        fontSize: { lg: '16px', xl: '20px' },
                      }}
                      gutterBottom
                      variant='h6'
                      component='p'
                    >
                      {shop.adress}
                      <Image
                        style={{ margin: '0 10px' }}
                        src={metroIcon}
                        alt='metro icon'
                      ></Image>
                      {shop.metro}
                    </Typography>
                    <Typography
                      sx={{
                        alignSelf: 'left',
                        opacity: delivery === shop.adress ? '1' : '0.5',
                      }}
                      gutterBottom
                      variant='body2'
                      component='span'
                    >
                      {shop.time}
                    </Typography>
                  </>
                }
              />
            ))}
          </FormControl>
        )}

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
          <Button sx={{ mt: 'max(10px,0.05vw)' }} variant='contained'>
            Оформить заказ
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
