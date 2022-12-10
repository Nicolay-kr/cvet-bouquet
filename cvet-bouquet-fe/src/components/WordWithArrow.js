import * as React from 'react';
import navArrow from '../../public/assets/icons/navArrow.svg';
import IconButton from '@mui/material/IconButton';
import Image from 'next/future/image';
import Box from '@mui/material/Box';
import { Typography } from '../../node_modules/@mui/material/index';

export default function WordWithArrow({
  title,
  withClick = null,
  useOutsideState = false,
  state = null,
  isActive = false,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    if (!useOutsideState) {
      setOpen((state) => !state);
    }
    if (withClick) {
      withClick(event);
    }
  };
  const activeState = useOutsideState ? state : open;

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      onClick={handleClick}
    >
      <Typography
        variant='h5'
        sx={{
          m: '0',
          color: isActive ? 'primary.main' : '#000000',
        }}
        component='p'
      >
        {title}
      </Typography>
      <IconButton
        sx={{
          p: '4px',
          mt: '2px',
          transformOrigin: 'center',
          transform: activeState ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: '0.1s',
        }}
        component='span'
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        <Image src={navArrow} alt='belcard icon'></Image>
      </IconButton>
    </Box>
  );
}
