import { sanityClient } from '../../sanity';


const generateOrderNumber = async () => {
  const orders = await sanityClient.fetch(
    `*[ _type == "orders"]{
      _id,
      status,
    }`
  );
  return `order-N${orders.length+1}`
};

export default generateOrderNumber;
