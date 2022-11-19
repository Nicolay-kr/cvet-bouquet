import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import navArrow from '../../assets/icons/navArrow.svg';
import { IconButton } from '../../../node_modules/@mui/material/index';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import logoFlower from '../../assets/images/logo_flower.svg';

export default function DropList({ list, prevSlug }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget.parentElement);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickListItem = (e, slug) => {
    router.push(slug);
    setAnchorEl(null);
  };
  // console.log(list)

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
        {list?.map((item) => {
          if (item.title === 'Премиум флористика') {
            return (
              <MenuItem
                key={`${item.slug.current}-list`}
                sx={{ bgcolor: '#FFFBF6', position: 'relative' }}
                onClick={(e) => handleClickListItem(e, `${prevSlug? prevSlug:''}/${item.slug.current}`)}
              >
                <span style={{ zIndex: '3' }}>{item.title}</span>
                <Image
                  style={{
                    position: 'absolute',
                    right: '1%',
                    width: '40px',
                    zIndex: '2',
                  }}
                  src={logoFlower}
                  alt='logo flower'
                ></Image>
              </MenuItem>
            );
          } else {
            return (
              <MenuItem
                key={`${item.slug.current}-list`}
                sx={{ bgcolor: '#FFFBF6' }}
                onClick={(e) => handleClickListItem(e, `${prevSlug? prevSlug:''}/${item.slug.current}`)}
              >
                {item.title}
              </MenuItem>
            );
          }
        })}
      </Menu>
    </>
  );
}
