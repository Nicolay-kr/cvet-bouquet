import * as React from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import { Link } from '../../../node_modules/@mui/material/index';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SuccsessModal from '../SuccsessModal';
import size from '../../utils/size';
import verticalLogo from '../../../public/assets/images/verticalLogo.png';
import Image from 'next/future/image';
import {
  contactSchema,
  defaultSchema,
} from '../../verifiedSchemas/freePayFormSchema';

const defaultState = {
  name: '',
  phone: '',
  OrderAmount: '',
  email: '',
  comment: '',
};

const defaultStateForContacts = {
  name: '',
  phone: '',
  email: '',
  comment: '',
};

export default function FreePayForm({ isContactsForm = false }) {
  const [isOpenSuccessModal, setIsOpenModal] = React.useState(false);
  const [formProcessing, setFormProcessing] = React.useState(false);

  const lg = useMediaQuery('(min-width:1200px)');

  const defaultValue = isContactsForm ? defaultStateForContacts : defaultState;

  const schema = isContactsForm ? contactSchema : defaultSchema;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setFormProcessing(true);
    setIsOpenModal(true)
    if (isContactsForm) {
      fetch('https://formspree.io/f/mzbqpyrw', {
        method: 'POST',
        body: JSON.stringify({
          'Имя': data.name,
          'Телефон': data.phone,
          'Email': data.email,
          'Сообщение': data.comment,
        }),
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => {
          console.log('response', response);
          setFormProcessing(false);
          setIsOpenModal(true);
          reset(defaultValue);
        })

        .catch((error) => {
          console.log('error', error);
          setFormProcessing(false);
          setIsOpenModal(false);
        });
    } else {
      fetch('api/createOrder', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          orderType: 'Свободный платеж',
          paymentType: 'Онлайн оплата',
          registration: new Date(),
        }),
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => {
          console.log('response', response);
          // setFormProcessing(false);
          // setIsOpenModal(true);
          // reset(defaultValue);
        })

        .catch((error) => {
          console.log('error', error);
          // setFormProcessing(false);
          // setIsOpenModal(false);
        });
    }
  };

  const onClose = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <SuccsessModal
        onClose={onClose}
        open={isOpenSuccessModal}
        isContactsForm={isContactsForm}
        formProcessing={formProcessing}
      ></SuccsessModal>
      <Box
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '100%',
          my: { xs: '40px', lg: '60px' },
        }}
      >
        <Paper
          sx={{
            px: { ...size(130), xs: '5%' },
            width: '100%',
            display: 'grid',
            gridTemplateColumns: { sx: '1fr', lg: '10fr' },
            bgcolor: 'fon.main',
          }}
        >
          <Box
            sx={{
              py: { xs: '40px', lg: '70px' },
              width: '100%',
              gridColumn: '2',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { sx: '1fr', md: '1fr 1fr' },
              }}
            >
              <Box>
                <Typography
                  variant='h4'
                  component='p'
                  color='#000000'
                  sx={{ fontWeight: '700', mb: 'max(36px,1.9vw)' }}
                >
                  {isContactsForm ? 'Написать руководителю' : 'Оплата услуг'}
                </Typography>

                {isContactsForm ? (
                  <>
                    <Typography
                      variant='h5'
                      component='p'
                      color='#000000'
                      sx={{ mt: { xs: 10, xxl: '0.05vw' } }}
                    >
                      Если у Вас возникли пожелания или предложения по работе
                      нашей студии, ассортименту цветов и сопутствующих товаров,
                      я с радостью лично отвечу Вам.
                    </Typography>
                    <Typography
                      variant='h5'
                      component='p'
                      color='#000000'
                      sx={{
                        mt: { xs: 20, xxl: '0.05vw' },
                        mb: { ...size(30), xs: 20 },
                      }}
                    >
                      С уважением, Наталья Новицкая
                    </Typography>
                  </>
                ) : null}
              </Box>
              {isContactsForm ? (
                <Box
                  component={Image}
                  src={verticalLogo}
                  alt='logo'
                  sx={{
                    display: { xs: 'none', lg: 'block' },
                    width: size(180),
                    height: size(120),
                    ml: 'auto',
                  }}
                ></Box>
              ) : null}
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'grid',
                columnGap: 'max(30px, 1.5vw)',
                rowGap: 'max(24px, 1.2vw)',
                gridTemplateColumns: { sx: '1fr', lg: '1fr 1fr' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
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
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id='phone'
                      label='Ваш номер телефона.'
                      sx={{ mt: 'max(24px, 1.2vw)' }}
                      error={errors.phone?.message.length > 0}
                      helperText={errors.phone?.message}
                      {...field}
                    />
                  )}
                />

                {isContactsForm ? null : (
                  <Controller
                    name='OrderAmount'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id='OrderAmount'
                        label='Сумма BYN'
                        sx={{ mt: 'max(24px, 1.2vw)' }}
                        error={errors.OrderAmount?.message.length > 0}
                        helperText={errors.OrderAmount?.message}
                        {...field}
                      />
                    )}
                  />
                )}

                {lg ? (
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 3fr',
                      columnGap: { ...size(30), xs: 16 },
                      mt: 'auto',
                    }}
                  >
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      sx={{ height: '60px', marginTop: 'auto' }}
                    >
                      отправить
                    </Button>
                    <Typography
                      variant='body2'
                      component='p'
                      color='#000000'
                      sx={{
                        fontWeight: '700',
                        marginTop: 'auto',
                      }}
                    >
                      Отправляя заявку, вы принимаете{' '}
                      <Link
                        style={{ color: '#8C7B5F', cursor: 'pointer' }}
                        href='/privacy'
                      >
                        соглашение об обработке персональных данных, политику
                        конфиденциальности и договор оферты
                      </Link>
                    </Typography>
                  </Box>
                ) : null}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
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
                <Controller
                  name='comment'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      multiline
                      style={{ height: '100%' }}
                      sx={{
                        mt: 'max(24px, 1.2vw)',
                        '& div': { height: '100%' },
                        '& textarea': { height: '100% !important' },
                      }}
                      rows={isContactsForm ? 8 : 10}
                      id='comment'
                      label={
                        isContactsForm ? 'Ваш вопрос' : 'Комментарии к заказу'
                      }
                      {...field}
                    />
                  )}
                />
              </Box>
            </Box>
            {!lg ? (
              <Box
                sx={{
                  mt: '40px',
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  columnGap: 'max(30px, 1.5vw)',
                }}
              >
                <Typography
                  variant='body1'
                  component='p'
                  color='#000000'
                  sx={{ mb: 40 }}
                >
                  Отправляя заявку, вы принимаете{' '}
                  <Link style={{ color: '#8C7B5F' }} href='/privacy'>
                    соглашение об обработке персональных данных, политику
                    конфиденциальности и договор оферты
                  </Link>
                </Typography>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  sx={{ height: '60px', marginTop: 'auto' }}
                >
                  Отправить
                </Button>
              </Box>
            ) : null}
          </Box>
        </Paper>
      </Box>
    </>
  );
}
