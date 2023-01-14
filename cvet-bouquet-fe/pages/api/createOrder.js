// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import uniqid from 'uniqid';
import { createPayment } from '../../src/utils/createPayment';
import generateOrderNumber from '../../src/utils/generateOrderNumber';
import addOrder from '../../src/utils/sanityMethods/addOrder';
import { sendMessageAboutOrder } from '../../src/utils/sendMessageAboutOrder';

export default async function handler(req, res) {
  const orderData = JSON.parse(req.body);
  const orderId = uniqid();
  const orderNumber = generateOrderNumber(orderId);
  orderData.id = orderId;
  orderData.OrderNumber = orderNumber;

  try {
    await addOrder(orderData);
    await sendMessageAboutOrder(orderData);
    await createPayment({
        OrderNumber: orderData.orderNumber,
        OrderAmount: orderData.OrderAmount,
        URL_RETURN_OK:'https://cvet-bouquet-nicolay-kr.vercel.app/cart',
    });
    res.status(200).send('Order was created');
  } catch (e) {
    res.status(500).send({ message: 'Order was not created',error: e, });
  }
}
