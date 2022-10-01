import React from 'react';
import { Toolbar } from './Toollbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Toolbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
