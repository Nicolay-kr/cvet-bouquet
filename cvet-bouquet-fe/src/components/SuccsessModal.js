import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Cros from '../../public/assets/icons/cros.svg';
import Button from '@mui/material/Button';


const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', lg: '35%' },
  bgcolor: 'fon.main',
  boxShadow: 24,
  p: '40px',
};

export default function SuccsessModal({
  open = false,
  onClose,
  isContactsForm = false,
}) {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby='spring-modal-title'
        aria-describedby='spring-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper sx={style}>
            <IconButton
              sx={{
                ml: 'auto',
              }}
              component='p'
              role='presentation'
              onClick={handleClose}
              aria-label="CrossIcon"
            >
              <Box
                component={Cros}
                sx={{ width: '24px', height: '24px' }}
                viewBox="0 0 18 18"
              ></Box>
            </IconButton>

            <Typography
              id='modal-modal-title'
              variant='h3'
              component='h2'
            >
              {isContactsForm
                ? 'Ваше соощение отправленно'
                : 'Платёж совершён успешно'}
            </Typography>
            <Typography
              id='modal-modal-description'
              variant='h5'
              component='p'
              sx={{ mt: '20px' }}
            >
              {isContactsForm
                ? 'Мы свяжемся с Вами в ближайшее время'
                : 'Спасибо что воспользовались услугами нашей компании'}
            </Typography>

            <Button
              onClick={handleClose}
              variant='contained'
              color='primary'
              sx={{ mt: '40px', width: { xs: '100%', lg: '200px' } }}
            >
              Оk
            </Button>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
