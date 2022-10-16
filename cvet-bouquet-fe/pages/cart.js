import React from 'react';
import styles from '../styles/Cart.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppContext } from '../src/components/context/HeartContext';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Cart() {
  const bouquetsContext = useAppContext();
  const bouquets = bouquetsContext.bouquetsInCarts;

  return (
    <TableContainer sx={{ width: '100%', px: '10%', my: 6 }} component='div' className={styles.conteiner} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Цена</TableCell>
            <TableCell align="right">Количество</TableCell>
            <TableCell align="right">Сумма</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bouquets.map((bouquet) => (
            <TableRow
              key={bouquet.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {bouquet.title}
              </TableCell>
              <TableCell align="right">{bouquet.price}</TableCell>
              <TableCell align="right">{bouquet.price}</TableCell>
              <TableCell align="right">{bouquet.price}</TableCell>
              <TableCell align="right">{bouquet.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}