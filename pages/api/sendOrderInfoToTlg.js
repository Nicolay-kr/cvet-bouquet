import logger from '../../services/logger';

import isJson from '../../src/utils/isJson';

import senMessageToTelegram from '../../src/utils/senMessageToTelegram';

export default async function handler(req, res) {
  logger.info('sendOrderInfoToTlg', req);

  try {
    const message = isJson(req.body) ? JSON.parse(req.body) : req.body;
    await senMessageToTelegram(message);
    return res
      .status(200)
      .json({ data: message, message: 'Message was sent successfully' });
  } catch (e) {
    console.log(e);
    logger.error(e.stack);
    return res.status(400).send({ message: `Message was not sent. ${e}` });
  }
}
