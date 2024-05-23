import logger from '../../services/logger';

async function sendMessageToTlgproxy(message) {
  logger.info('sendMessageToTlg', message);
  try {
    await fetch(`https://cvet-bouquet-nicolay-kr.vercel.app/api/sendOrderInfoToTlg`,{
      method: 'POST',
      body: encodeURIComponent(message),
    });
  } catch (e) {
    console.log(e);
  }
}

export default sendMessageToTlgproxy;
