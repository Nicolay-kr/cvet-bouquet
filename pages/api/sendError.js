import logger from '../../services/logger';

export default async function handler(req, res) {
  try {
    logger.error(req.body.error);
    
    return res.status(200).send('OK');
  } catch (e) {
    console.log(e);
    logger.error(e.stack);
    return res.status(400).send({ message: `Order was not created. ${e}` });
  }
}
