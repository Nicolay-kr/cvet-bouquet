import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/future/image';
import metroIcon from '../assets/icons/metro.svg';
import CheckoutsButtons from './CheckoutsButtons';
import TextField from '@mui/material/TextField';

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
  const [delivery, setDelivery] = React.useState(shopsList[0].adress);

  const handleChangeDelivery = (event) => {
    setDelivery(event.target.value);
  };
  return (
    <Box
      sx={{
        width: '60%',
        mb: 'max(80px,4.2vw)',
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
      ></CheckoutsButtons>

      <Box width='100%'>
        <Typography variant='h3' color='initial'>Ваши данные</Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '3fr 3fr',
            gridTemplateRows: 'auto',
            columnGap: 'max(30px,1.5vw)',
            rowGap: 'max(20px,1vw)',
            mt:'max(20px,1vw)'
          }}
        >
          <TextField
            id='customer-name'
            label='Ваше имя'
          />
          <TextField
            id='customer-telephone'
            label='Ваш номер телефона'
            sx={{gridColumnStart: 1}}
          />
          <TextField
            id='customer-email'
            label='Ваш e-mail'
          />
        </Box>
      </Box>

      <CheckoutsButtons
        title={'Доставка'}
        leftBtnTitle={'Доставка'}
        rightBtnTitle={'Самовывоз'}
      ></CheckoutsButtons>

      <FormControl>
        {shopsList.map((shop, index) => (
          <FormControlLabel
            key={index}
            sx={{ mb: '20px' }}
            value={shop.adress}
            control={<Radio checked={delivery === shop.adress} />}
            onChange={handleChangeDelivery}
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

      <CheckoutsButtons
        title={'Выберите способ оплаты'}
        leftBtnTitle={'Банковская карта'}
        rightBtnTitle={'Наличные'}
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
  );
}
