import React, { useEffect, useCallback, useState } from 'react';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';
import { sanityClient } from '../../../sanity';
import InstagramBlock from '../InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import size from '../../utils/size';
import useSWR from 'swr';
import groq from "groq";
import CircularProgress from '@mui/material/CircularProgress';





export default function Layout({ children }) {
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

  if (error) return <CircularProgress sx={{position:'absolute',top:'50%',left:'50%'}}/>
  if (isLoading) return <CircularProgress sx={{position:'absolute',top:'50%',left:'50%'}}/>

  return (
    <>
      <Header data={data} />
      <main>
        {children}
        <Box sx={{ my: size(300), px: { xs: '5%', lg: '10%' } }}>
          <InstagramBlock instagramPosts={data?.instagramBlock}></InstagramBlock>
        </Box>
      </main>
      <Footer data={data} />
    </>
  );
}
