
import { sanityClient } from '../../../sanity';
import useSWR from 'swr';
import groq from "groq";

export default function useFetchGeneralData() {
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
  return { data, error, isLoading };
}
