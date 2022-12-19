import React, { useEffect,useCallback,useState } from 'react';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';
import { sanityClient } from '../../../sanity';
import InstagramBlock from '../InstagramBlock/InstagramBlock';
import Box from '@mui/material/Box';
import size from '../../utils/size';
import getInstagramPost from '../../utils/getInstagramPost';

export default function Layout({ children}) {

  const [data, setData] = useState([]);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const fetchData = useCallback(async () => {
    sanityClient
			.fetch(
				`*[ _type == "generalInfo"][0]{
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
        }`
			)
			.then((data) => setData(data))
      
			.catch(console.error);
  }, []);

  const fetchInstagrammData = useCallback(async () => {
    const posts = await getInstagramPost();
    setInstagramPosts(posts)
    
  }, []);

  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchInstagrammData();
  }, []);
  

  return (
    <>
      <Header data={data}/>
      <main>
        {children}
        <Box sx={{ my: size(300), px: { xs: '5%', lg: '10%' } }}>
        <InstagramBlock instagramPosts={instagramPosts}></InstagramBlock>
      </Box>
      </main>
      <Footer data={data}/>
    </>
  );
}

