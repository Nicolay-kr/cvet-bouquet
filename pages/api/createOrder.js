// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import uniqid from 'uniqid';
import { sanityClient } from '../../sanity';
import logger from '../../services/logger';
import { transporter, mailOptions } from '../../src/config/nodemailer';
import { createPayment } from '../../src/utils/createPayment';
import generateOrderNumber from '../../src/utils/generateOrderNumber';
import getActiveEmails from '../../src/utils/getActiveEmails';
import isJson from '../../src/utils/isJson';
import { messageFormatter } from '../../src/utils/messageFormatter';
import { sendMessageAboutOrder } from '../../src/utils/sendMessageAboutOrder';
import senMessageToTelegram from '../../src/utils/senMessageToTelegram';

export default async function handler(req, res) {
  logger.info('createOrder', req);

  try {
    const orderData = isJson(req.body) ? JSON.parse(req.body) : req.body;
    const orderId = uniqid();

    orderData.OrderAmount = orderData.OrderAmount.toString();
    orderData.status = 'В ожидании';
    const orderNumber = await generateOrderNumber();
    orderData.OrderNumber = orderNumber;

    const data = {
      ...orderData,
      _id: orderId,
      _type: 'orders',
    };
    console.log(data);

    // const activeEmails = await getActiveEmails();

    // await sanityClient.createIfNotExists(data);
    const formatMessage = messageFormatter(orderData);
    // await transporter.sendMail({
    //   ...mailOptions,
    //   to: [...mailOptions.to, ...activeEmails],
    //   subject: orderData.orderType,
    //   text: formatMessage,
    // });
    await senMessageToTelegram(encodeURIComponent(formatMessage));

    return res
      .status(200)
      .json({ data: orderData, message: 'Order was created' });
  } catch (e) {
    console.log(e);
    logger.error(e.stack);
    return res.status(400).send({ message: `Order was not created. ${e}` });
  }
}
