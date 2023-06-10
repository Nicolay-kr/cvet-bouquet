import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from "next/image";
import { useRouter } from 'next/router';
import logoFlower from '../../../public/assets/images/logo_flower.svg';
import WordWithArrow from '../WordWithArrow/WordWithArrow';
import size from '../../utils/size';

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
    router.push({
      pathname: slug,
  });
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
            return (
              <MenuItem
                key={`${item.slug.current}-list`}
                sx={{ bgcolor: '#FFFBF6',fontSize:size(20),px:size(40),py:size(20)}}
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
          
        })}
      </Menu>
    </>
  );
}
