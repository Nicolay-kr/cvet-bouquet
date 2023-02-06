import { transporter, mailOptions } from '../../src/config/nodemailer';
import isJson from '../../src/utils/isJson';

import senMessageToTelegram from '../../src/utils/senMessageToTelegram';

export default async function handler(req, res) {
  const data = isJson(req.body) ? JSON.parse(req.body) : req.body;

  try {
    await transporter.sendMail({
      ...mailOptions,
      to:[...mailOptions],
      subject: 'Письмо ру',
      text: data
    });

    return res.status(200).send('OK');
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: `Order was not created. ${e}` });
  }
}
