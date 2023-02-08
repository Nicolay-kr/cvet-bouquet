import logger from '../../services/logger';
import { transporter, mailOptions } from '../../src/config/nodemailer';
import isJson from '../../src/utils/isJson';

export default async function handler(req, res) {
  
  const data = isJson(req.body) ? JSON.parse(req.body) : req.body;

  const message = `   
  Имя: ${data.name},
  Телефон: ${data.phone},
  Email: ${data.email},
  Сообщение: ${data.comment},
`
  try {
    await transporter.sendMail({
      ...mailOptions,
      to:[...mailOptions.to],
      subject: 'Письмо руководителю',
      text: message,
    });

    return res.status(200).send('OK');
  } catch (e) {
    console.log(e);
    logger.error(e.stack);
    return res.status(400).send({ message: `Email was not sended. ${e}` });
  }
}
