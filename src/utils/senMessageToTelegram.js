import logger from '../../services/logger';
import getUsers from '../../src/utils/getUsers';

async function senMessageToTelegram(message) {
  logger.info('senMessageToTelegram', message);
  const tgbot = process.env.TELEGRAM_TOKEN;
  try {
    const users = await getUsers();
    const activeUsers = users.filter(
      (user) =>
        user.active &&
        user.telegramBlock.telegramAllow &&
        user.telegramBlock.chatId
    );
    if (activeUsers.length) {
      const messages = activeUsers.map((user) =>
        fetch(
          `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${336711852}&text=${message}`
        )
      );
      return await Promise.all(messages);
    }
  } catch (e) {
    console.log(e);
  }
}

export default senMessageToTelegram;
