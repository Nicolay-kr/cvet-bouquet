import React from 'react';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';
import { Typography } from '../../../node_modules/@mui/material/index';
import { useAppContext } from '../context/BouquetsContext';

export default function Layout({ children,category, bouquets }) {
  return (
    <>
      <Header category={category} bouquets={bouquets} />
      <main>{children}</main>
      <Footer category={category}/>
    </>
  );
}
