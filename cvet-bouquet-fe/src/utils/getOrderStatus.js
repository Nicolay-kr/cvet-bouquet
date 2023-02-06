import { sanityClient } from '../../sanity';

const getOrderStatus = async (order) => {
  const order = await sanityClient.fetch(
    `*[ _type == "orders" && OrderNumber == ${order}]{
      OrderNumber,
      status,
      billnumber,
      OrderAmount,
    }`
  );

  return order;
};

export default getOrderStatus;
