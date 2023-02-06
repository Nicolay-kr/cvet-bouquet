import { sanityClient } from '../../sanity';

const getOrderStatus = async (order) => {
  const orderInfo = await sanityClient.fetch(
    `*[ _type == "orders" && OrderNumber == ${order}]{
      OrderNumber,
      status,
      billnumber,
      OrderAmount,
    }`
  );

  return orderInfo;
};

export default getOrderStatus;
