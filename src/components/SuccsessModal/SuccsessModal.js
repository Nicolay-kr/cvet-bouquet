import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Cros from '../../../public/assets/icons/cros.svg';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Whitecros from '../../../public/assets/icons/whitecros.svg';
import size from '../../utils/size';

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
  onClose = null,
  isContactsForm = false,
  formProcessing = false,
  title,
  text,
  children,
}) {
  const handleClose = () => {
    if (onClose) {
      onClose(false);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby='spring-modal-title'
        aria-describedby='spring-modal-description'
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {formProcessing ? (
          <CircularProgress color='fon' />
        ) : (
          <Fade in={open}>
            {children ? (
              <Box>
                <IconButton
                  sx={{
                    mr: 'auto',
                    position: 'absolute',
                    right: '10%',
                    top: '5%',
                  }}
                  component='p'
                  role='presentation'
                  onClick={handleClose}
                  aria-label='CrossIcon'
                >
                  <Whitecros />
                </IconButton>
                {children}
              </Box>
            ) : (
              <Paper sx={style}>
                <IconButton
                  sx={{
                    ml: 'auto',
                  }}
                  component='p'
                  role='presentation'
                  onClick={handleClose}
                  aria-label='CrossIcon'
                >
                  <Box
                    component={Cros}
                    sx={{ width: '24px', height: '24px' }}
                    viewBox='0 0 18 18'
                  ></Box>
                </IconButton>

                <Typography id='modal-modal-title' variant='h3' component='h2'>
                    {title}
                </Typography>
                <Typography
                  id='modal-modal-description'
                  variant='h5'
                  component='p'
                  sx={{ mt: '20px' }}
                >
                    {text}
                </Typography>

                <Button
                  onClick={handleClose}
                  variant='contained'
                  color='primary'
                  sx={{
                    mt: '40px',
                    width: {
                      xs: '100%',
                      lg: '200px',
                      fontSize: { ...size(24), xs: 18 },
                    },
                  }}
                >
                  Оk
                </Button>
              </Paper>
            )}
          </Fade>
        )}
      </Modal>
    </div>
  );
}
