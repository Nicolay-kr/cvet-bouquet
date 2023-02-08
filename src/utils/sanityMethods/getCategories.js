import { sanityClient } from '../../../sanity';

export const getCategories = () => {
  return sanityClient.fetch(
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
  );
};
