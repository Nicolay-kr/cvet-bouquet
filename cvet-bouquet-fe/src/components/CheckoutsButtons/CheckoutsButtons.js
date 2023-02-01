import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import size from '../../utils/size';

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
      <Box
        sx={{
          width: '100%',
          height: 'max(140px,0.73vw)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: {...size(30), xs:16},
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
      </Box>
    </Box>
  );
}
