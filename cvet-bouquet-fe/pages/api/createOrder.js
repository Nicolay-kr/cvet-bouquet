// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import uniqid from 'uniqid';
import { sanityClient } from '../../sanity';
import { createPayment } from '../../src/utils/createPayment';
import generateOrderNumber from '../../src/utils/generateOrderNumber';
import isJson from '../../src/utils/isJson';
import { sendMessageAboutOrder } from '../../src/utils/sendMessageAboutOrder';


export default async function handler(req, res) {
  const orderData = isJson(req.body)?JSON.parse(req.body):req.body;
  const orderId = uniqid();
  const orderNumber = generateOrderNumber(orderId);
  orderData.OrderNumber = orderNumber;

  const data = {
    ...orderData,
    _id: orderData.orderId,
    _type: 'orders',
  }
  try {
    await sanityClient.createIfNotExists(data)
    await sendMessageAboutOrder(orderData);
    await createPayment({
        OrderNumber: orderData.orderNumber,
        OrderAmount: orderData.OrderAmount,
        URL_RETURN_OK:'https://cvet-bouquet-nicolay-kr.vercel.app/cart',
    });
    return res.status(200).send({ message: 'Order was created'})
    
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: `Order was not created. ${e}`});
  }
}
