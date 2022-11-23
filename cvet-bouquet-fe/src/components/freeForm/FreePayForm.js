import * as React from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArcheMainConteiner from '../ArcheImageConteiners/ArcheMainConteiner';
import { urlFor } from '../../../sanity';
import { NextSanityIMG } from '../CustopNextComponents/NextSanityIMG';
import ArcheSecondConteiner from '../ArcheImageConteiners/ArcheSecondConteiner';
import bigFlower from '../../../public/assets/images/bigFlower.svg';
import Image from 'next/future/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import { Link, TextField } from '../../../node_modules/@mui/material/index';

export default function FreePayForm({ isContactsForm = false }) {
  const lg = useMediaQuery('(min-width:1200px)');


  const defaultState = {
    name: '',
    phone: '',
    summa: '',
    email: '',
    comment: '',
  };

  const defaultStateWithContacts = {
    name: '',
    phone: '',
    email: '',
    comment: '',
  };

  const defaultValue = isContactsForm ? defaultStateWithContacts : defaultState;

  const [formState, setForm] = React.useState({ defaultValue });

  const handleNameChange = (e) => {
    setForm((state) => ({ ...state, name: e.target.value }));
  };

  const handlePhoneChange = (e) => {
    setForm((state) => ({ ...state, phone: e.target.value }));
  };

  const handleSummaChange = (e) => {
    setForm((state) => ({ ...state, summa: e.target.value }));
  };

  const handleEmailChange = (e) => {
    setForm((state) => ({ ...state, email: e.target.value }));
  };

  const handleCommentChange = (e) => {
    setForm((state) => ({ ...state, comment: e.target.value }));
  };
  // console.log(formState);

  return (
    <Box
      sx={{
        width: '100%',
        my: { xs: '40px', lg: '60px' },
      }}
    >
      <Paper
        sx={{
          px: '5%',
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
          <Typography
            variant='h4'
            componet='p'
            color='#000000'
            sx={{ fontWeight: '700', mb: 'max(36px,1.9vw)' }}
          >
            {isContactsForm
              ? 'Если у вас возникли впоросы, с радостью ответим'
              : 'Оплата услуг'}
          </Typography>
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
              <TextField
                id='customer-name'
                label='Вашe имя'
                onChange={handleNameChange}
              />
              <TextField
                id='customer-phone'
                label='Ваш номер телефона'
                onChange={handlePhoneChange}
                sx={{ mt: 'max(24px, 1.2vw)' }}
              />

              {isContactsForm ? null : (
                <TextField
                  id='customer-summa'
                  label='Сумма BYN'
                  onChange={handleSummaChange}
                  sx={{ mt: 'max(24px, 1.2vw)' }}
                />
              )}

              {lg ? (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    columnGap: 'max(30px, 1.5vw)',
                    mt: '40px',
                  }}
                >
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{ height: '60px', marginTop: 'auto' }}
                  >
                    отправить
                  </Button>
                  <Typography
                    variant='body1'
                    componet='p'
                    color='#000000'
                    sx={{
                      fontWeight: '700',
                      mb: 'max(36px,1.9vw',
                      marginTop: 'auto',
                    }}
                  >
                    Отправляя заявку, вы принимаете{' '}
                    <Link style={{ color: '#8C7B5F', cursor: 'pointer' }}>
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
              <TextField
                id='customer-email'
                label='Ваш e-mail'
                onChange={handleEmailChange}
              />
              <TextField
                multiline
                style={{height:'100%',}}
                sx={{
                  mt: 'max(24px, 1.2vw)',
                  '& div': { height: '100%' },
                  '& textarea': { height: '100% !important' },
                }}
                rows={10}
                id='customer-comment'
                label={isContactsForm ? 'Ваш вопрос' : 'Комментарии к заказу'}
                onChange={handleCommentChange}
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
                componet='p'
                color='initial'
                sx={{ fontWeight: '700', mb: 'max(36px,1.9vw)' }}
              >
                Отправляя заявку, вы принимаете{' '}
                <Link style={{ color: '#8C7B5F' }}>
                  соглашение об обработке персональных данных, политику
                  конфиденциальности и договор оферты
                </Link>
              </Typography>
              <Button
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
  );
}
