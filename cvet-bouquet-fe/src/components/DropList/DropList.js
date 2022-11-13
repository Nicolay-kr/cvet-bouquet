import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import navArrow from '../../assets/icons/navArrow.svg';
import { IconButton } from '../../../node_modules/@mui/material/index';
import Image from 'next/future/image';
import { useRouter } from 'next/router';

export default function DropList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    router.push('/catalog')
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
        Авторские букеты
        </MenuItem>
        <MenuItem sx={{ bgcolor: '#FFFBF6' }} onClick={handleClose}>
        В коробке
        </MenuItem>
        <MenuItem sx={{ bgcolor: '#FFFBF6' }} onClick={handleClose}>
        Монобукеты
        </MenuItem>
        <MenuItem sx={{ bgcolor: '#FFFBF6',fontFamily:'Zeferino One',fontSize:'30px' }} onClick={handleClose}>
        Премиум флористика
        </MenuItem>
        <MenuItem sx={{ bgcolor: '#FFFBF6' }} onClick={handleClose}>
        Цветочные письма
        </MenuItem>
        <MenuItem sx={{ bgcolor: '#FFFBF6' }} onClick={handleClose}>
        Свадебная флористика
        </MenuItem>
        <MenuItem sx={{ bgcolor: '#FFFBF6' }} onClick={handleClose}>
        Корзины с цветами
        </MenuItem>
      </Menu>
    </>
  );
}
