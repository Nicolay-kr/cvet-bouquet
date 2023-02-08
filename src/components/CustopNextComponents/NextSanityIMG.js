// import sanityClient from '@sanity/client';
import Img from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { sanityClient } from '../../../sanity';

export const NextSanityIMG = ({ image, alt }) => {
  const imageProps = useNextSanityImage(sanityClient, image);

  return (
    <Img
      {...imageProps}
      alt={alt}
      layout='responsive'
      sizes='(max-width: 800px) 100vw, 800px'
    />
  );
};
