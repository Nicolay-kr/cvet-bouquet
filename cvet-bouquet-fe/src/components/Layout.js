import React from 'react';
import { Header } from './Header';
import Footer from './Footer';
import { Typography } from '../../node_modules/@mui/material/index';
import { useAppContext } from './context/HeartContext';

export default function Layout({ children }) {
  const bouckeList = useAppContext()
  console.log(bouckeList)
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
