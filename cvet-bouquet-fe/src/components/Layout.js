import React from 'react';
import { Header } from './Header';
import Footer from './Footer';
import { Typography } from '../../node_modules/@mui/material/index';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
