import {createPreviewSubscriptionHook, createCurrentUserHook,createClient} from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import { useNextSanityImage } from 'next-sanity-image';

const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.SANITY_DATASET || 'production',
  projectId: '444cz5oj',
  // apiVersion: '2021-10-21', // Learn more: https://www.sanity.io/docs/api-versioning
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2022-12-15',

  /**
   * OPTIONAL config to enable authentication with custom token
   * You might need this if you host the preview on a different url than Sanity Studio
   */
  token: 'skwGJy26rDinNPz866iSuWdFcHfTSSvpNbsmzcy9nU27K3uMAJWw0RZQq3clLemRGvS57BoO9S9Xf3WakoJaVaQNLCLZ7kLjI7fTGNjZfIJlcXwHpFBsjvLTDtaQiox7ci1ZaU2myzovR4eRz88ZE6HeePOBQU89tCHhRvF0TX49IBPNGUsF',
 /* EventSource:  provide your own event source implementation. Required in browsers to support the above token parameter. */
};

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)

export const sanityClient = createClient(config)
