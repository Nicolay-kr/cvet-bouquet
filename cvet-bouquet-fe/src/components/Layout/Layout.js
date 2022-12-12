import React, { useEffect,useCallback,useState } from 'react';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';
import { sanityClient } from '../../../sanity';

export default function Layout({ children}) {

  const [data, setData] = useState([]);
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

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header data={data}/>
      <main>{children}</main>
      <Footer data={data}/>
    </>
  );
}

