import { sanityClient } from '../../sanity';

const getOrderStatus = async (order,chatId) => {
  const orderInfo = await sanityClient.fetch(
    `*[_type == "orders" && OrderNumber == ${order}][0]{
      OrderNumber,
      status,
      billnumber,
      OrderAmount,
      'user': *[ _type == "users" && active==true && telegramBlock.telegramAllow==true && telegramBlock.chatId==${chatId}][0]{
         'chatId':telegramBlock.chatId
          }
    }`
  );

  return orderInfo;
};

export default getOrderStatus;
