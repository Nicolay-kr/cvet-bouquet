import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import navArrow from '../../../public/assets/icons/navArrow.svg';
import IconButton from '@mui/material/IconButton';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import logoFlower from '../../../public/assets/images/logo_flower.svg';
import Box from '@mui/material/Box';
import WordWithArrow from '../WordWithArrow';

export default function DropList({ list, prevSlug, title }) {
  const [anchorEl, setAnchorEl] = React.useState();
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

  return (
    <>
      <WordWithArrow
        title={title}
        withClick={handleClick}
        useOutsideState={true}
        state={open}
      ></WordWithArrow>
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
          // if (item.title === 'Премиум флористика') {
          if (false) {
            return (
              <MenuItem
                key={`${item.slug.current}-list`}
                sx={{ bgcolor: '#FFFBF6', position: 'relative' }}
                onClick={(e) =>
                  handleClickListItem(
                    e,
                    `${prevSlug ? prevSlug : ''}/${item.slug.current}`
                  )
                }
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
                onClick={(e) =>
                  handleClickListItem(
                    e,
                    `${prevSlug ? prevSlug : ''}/${item.slug.current}`
                  )
                }
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
