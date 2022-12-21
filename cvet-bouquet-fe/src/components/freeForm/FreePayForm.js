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
import * as yup from 'yup';
import SuccsessModal from '../SuccsessModal';
import uniqid from 'uniqid';
import { sanityClient } from '../../../sanity';
import size from '../../utils/size';
import verticalLogo from '../../../public/assets/images/verticalLogo.png';
import Image from 'next/future/image';

export default function FreePayForm({ isContactsForm = false }) {
  const [isOpenSuccessModal, setIsOpenSuccessModal] = React.useState(false);
  const lg = useMediaQuery('(min-width:1200px)');

  const defaultState = {
    customerName: '',
    customerPhone: '',
    customerSumma: '',
    customerEmail: '',
    customerComment: '',
  };

  const defaultStateForContacts = {
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerComment: '',
  };

  const defaultValue = isContactsForm ? defaultStateForContacts : defaultState;

  yup.setLocale({
    number: {
      typeError: 'Это поле должно быть в числовом формате',
    },
  });

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
    })
    .required();

  const contactSchema = yup
    .object({
      customerName: yup.string().required('Это поле должно быть заполнено'),
      customerPhone: yup.string().required('Это поле должно быть заполнено'),
      customerEmail: yup.string().required('Это поле должно быть заполнено'),
    })
    .required();

  const schema = isContactsForm ? contactSchema : defaultSchema;

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(schema),
  });

  const addClient = (data) => {
    const doc = {
      _id: uniqid(),
      _type: 'clients',
      name: data?.customerName,
      phone: data?.customerPhone,
      email: data?.customerEmail,
    };

    sanityClient
      .createIfNotExists(doc)
      .then((res) => {
        console.log('Client was created (or was already present)');
      })
      .catch((error) => console.log(error));
  };

  const onSubmit = (data) => {
    setIsOpenSuccessModal(true);
    console.log(data);
    addClient(data);
  };

  const onClose = () => {
    setIsOpenSuccessModal(false);
  };

  return (
    <>
      <SuccsessModal
        onClose={onClose}
        open={isOpenSuccessModal}
        isContactsForm={isContactsForm}
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
                <Controller
                  name='customerPhone'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id='customerPhone'
                      label='Ваш номер телефона.'
                      sx={{ mt: 'max(24px, 1.2vw)' }}
                      error={errors.customerPhone?.message.length > 0}
                      helperText={errors.customerPhone?.message}
                      {...field}
                    />
                  )}
                />

                {isContactsForm ? null : (
                  <Controller
                    name='customerSumma'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id='customerSumma'
                        label='Сумма BYN'
                        sx={{ mt: 'max(24px, 1.2vw)' }}
                        error={errors.customerSumma?.message.length > 0}
                        helperText={errors.customerSumma?.message}
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
                <Controller
                  name='customerComment'
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
                      id='customerComment'
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
