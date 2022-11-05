import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import navArrow from '../../assets/icons/navArrow.svg';
import { IconButton, MenuList } from '../../../node_modules/@mui/material/index';
import Image from 'next/future/image';

export default function DropList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget.parentElement);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        sx={{
          mt: 1.6,
          transformOrigin: 'center',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: '0.1s',
        }}
        component='span'
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Image src={navArrow} alt='belcard icon'></Image>
      </IconButton>
      <Menu
        sx={{ '&>div+div': { bgcolor: '#FFFBF6' } }}
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem sx={{ bgcolor: '#FFFBF6' }} onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem sx={{ bgcolor: '#FFFBF6' }} onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem sx={{ bgcolor: '#FFFBF6' }} onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
