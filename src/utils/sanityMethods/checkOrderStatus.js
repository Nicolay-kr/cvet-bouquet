import { sanityClient } from '../../../sanity';

export const checkOrderStatus = async (order) => {
  try {
    const data = await sanityClient.fetch(
      `*[ _type == "orders" && OrderNumber == 'order-12'][0]{
          status
        }`
    )
    return data.status;
  } catch (error) {
    console.log(error);
    return null;
  }
};
