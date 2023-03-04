import React, { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';
import { sanityClient } from '../../../sanity';
import InstagramBlock from '../InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import size from '../../utils/size';
import useSWR from 'swr';
import groq from "groq";
import CircularProgress from '@mui/material/CircularProgress';
import deletingWithId from '../../utils/sanityMethods/deletingWithId';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { checkOrderStatus, checkorderStatus } from '../../utils/sanityMethods/checkOrderStatus';
import { useAppContext } from '../context/BouquetsContext';





export default function Layout({ children }) {
  const bouquetsContext = useAppContext();
  const { data, error, isLoading } = useSWR(groq`*[ _type == "generalInfo"][0]{
    ...,
    "categories": *[ _type == "categoryList"][0]{
            _id,
            categories[]->{
              _id,
              slug,
              title,
              mainImage,
              published,
              bouqets[]->{
                _id,
                title,
                slug,
                images,
                price,
                description,
              }
            },
          }
  }`, query =>
  sanityClient.fetch(query)
)

useEffect( () => {
  async function getStatus(){
    if(localStorage?.lastOrder){
      const status = await checkOrderStatus(localStorage.lastOrder);
      if(status === 'Оплачен'){
        bouquetsContext.clearCart();
        localStorage.removeItem('lastOrder');
      }
    }
  }
  getStatus()
},[])

// useEffect(()=>deletingWithId(sanityClient, 'f934e94b-3059-42d9-beca-80fe4ca57611'),[])

  // if (error) return <CircularProgress sx={{position:'absolute',top:'50%',left:'50%'}}/>
  // if (isLoading) return <CircularProgress sx={{position:'absolute',top:'50%',left:'50%'}}/>

  return (
    <>
      <Header data={data} />
      <ErrorBoundary>
      <main>
        {children}
        <Box sx={{ my: size(150), px: { xs: '5%', lg: '10%' } }} component='section'> 
          <InstagramBlock instagramPosts={data?.instagramBlock}></InstagramBlock>
        </Box>
      </main>
      </ErrorBoundary>
      <Footer data={data} />
    </>
  );
}
