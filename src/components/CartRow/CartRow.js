import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Cros from '../../../public/assets/icons/cros.svg'
import IconButton from '@mui/material/IconButton';
import Image from "next/image";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CounterButtons from '../CounterButtons/CounterButtons';
import Link from '../CustopNextComponents/Link';
import { urlFor } from '../../../sanity';
import { useAppContext } from '../context/BouquetsContext';
import size from '../../utils/size';

const CartRow = ({ id, title, price, image, quantity, slug, categorySlug }) => {
  const bouquetsContext = useAppContext();

  const removeFromCart = () => {
    bouquetsContext.removeFromCart(id);
  };
  return (
    <>
      <TableRow
        key={id}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
          transition: '0.3s',
        }}
      >
        <TableCell component='th' scope='row'>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              '& img': { objectFit: 'cover' },
            }}
          >
            <Link    href={{
              pathname: `/catalog/products/${slug?.current}`,
              query: { category: 'cart'}
            }}>
              <Image
                style={{ objectFit: 'cover' }}
                layout='fill'
                width={100}
                height={125}
                src={urlFor(image)?.width(400)?.url()}
                alt='bouquet'
              ></Image>
            </Link>

            <Typography variant='h5'>{title}</Typography>
          </Box>
        </TableCell>

        <TableCell align='right' sx={{ width: 'max(200px,7.5vw)' }}>
          <Box component='span' sx={{display:'flex', justifyContent: 'center'}}>
            <Typography variant='h4'>{price}</Typography>
            <sup>BYN</sup>
          </Box>
        </TableCell>

        <TableCell align='center'>
          {/* <Typography variant='h4'>{price}</Typography> */}
          <CounterButtons id={id} value={quantity} />
        </TableCell>

        <TableCell align='center' sx={{ width: 'max(200px,7.5vw)' }}>
        <Box component='span' sx={{display:'flex', justifyContent: 'center'}}>
            <Typography variant='h4'>{price * quantity}</Typography>
            <sup>BYN</sup>
          </Box>
        </TableCell>

        <TableCell align='center'>
          <IconButton
            component='div'
            onClick={removeFromCart}
            aria-label='CrossIcon'
          >
            <Box
              component={Cros}
              sx={{ width: size(18) }}
              viewBox='0 0 18 18'
            ></Box>
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CartRow;
