import React from 'react';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
} from '../../../node_modules/@mui/material/index';
import { useAppContext } from '../context/BouquetsContext';

export default function CheckoutsButtons({
  title,
  leftBtnTitle,
  leftBtnSubtitle = null,
  rightBtnTitle,
  rightBtnSubtitle = null,
  handleClick,
}) {
  const [actveButton, setActveButton] = React.useState({
    btn1: true,
    btn2: false,
  });
  const handleActiveBtn1 = (e) => {
    handleClick(true);
    setActveButton({
      btn1: true,
      btn2: false,
    });
  };
  const handleActiveBtn2 = (e) => {
    handleClick(false);
    setActveButton({
      btn1: false,
      btn2: true,
    });
  };
  return (
    <Box>
      <Typography
        sx={{ mb: 'max(20px, 1.04vw)', alignSelf: 'left' }}
        gutterBottom
        variant='h3'
        component='h3'
      >
        {title}
      </Typography>
      <ButtonGroup
        sx={{
          width: '100%',
          height: 'max(140px,0.73vw)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: 'max(30px,1.5vw)',
        }}
        variant='text'
        aria-label='outlined button group'
      >
        <Button
          onClick={handleActiveBtn1}
          sx={{
            textTransform: 'none',
            display: 'flex',
            flexDirection: 'column',
          }}
          variant={actveButton.btn1 ? 'contained' : 'outlined'}
        >
          <Typography
            sx={{
              alignSelf: 'center',
              color: actveButton.btn1 ? 'white' : 'inherit',
            }}
            gutterBottom
            variant='h4'
            component='p'
          >
            {leftBtnTitle}
          </Typography>
          {leftBtnSubtitle ? (
            <Typography
              sx={{
                alignSelf: 'center',
                color: actveButton.btn1 ? 'white' : 'inherit',
              }}
              gutterBottom
              variant='body2'
              component='p'
            >
              {leftBtnSubtitle}
            </Typography>
          ) : null}
        </Button>
        <Button
          onClick={handleActiveBtn2}
          sx={{
            textTransform: 'none',
            display: 'flex',
            flexDirection: 'column',
          }}
          variant={actveButton.btn2 ? 'contained' : 'outlined'}
        >
          <Typography
            sx={{
              alignSelf: 'center',
              color: actveButton.btn2 ? 'white' : 'inherit',
            }}
            gutterBottom
            variant='h4'
            component='p'
          >
            {rightBtnTitle}
          </Typography>
          {rightBtnSubtitle ? (
            <Typography
              sx={{
                alignSelf: 'center',
                color: actveButton.btn2 ? 'white' : 'inherit',
              }}
              gutterBottom
              variant='body2'
              component='p'
            >
              {rightBtnSubtitle}
            </Typography>
          ) : null}
        </Button>
      </ButtonGroup>
    </Box>
  );
}
