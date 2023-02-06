import getUsers from '../../src/utils/getUsers';

async function senMessageToTelegram(message) {
  const tgbot = process.env.TELEGRAM_TOKEN;
  try {
    const users = await getUsers();
    console.log(users);
    const activeUsers = users.filter(
      (user) =>
        user.active &&
        user.telegramBlock.telegramAllow &&
        user.telegramBlock.chatId
    );
    console.log(activeUsers);
    if (activeUsers.length) {
      const messages = activeUsers.map((user) =>
        fetch(
          `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${user.telegramBlock.chatId}&text=${message}`
        )
      );
      console.log(messages);
      return await Promise.all(messages);
    }
  } catch (e) {
    console.log(e);
  }
}

export default senMessageToTelegram;
