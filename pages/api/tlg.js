import getUsers from '../../src/utils/getUsers';
import updateChatId from '../../src/utils/updateChatId';
import getOrderStatus from '../../src/utils/getOrderStatus';
import logger from '../../services/logger';

export default async (req, res) => {
  const tgbot = process.env.TELEGRAM_TOKEN;
  logger.info('tlg', req.body.message);
  console.log(req.body.message);
  try {
    if (req.body.message?.text === '/start') {
      const users = await getUsers();
      const user = users.find(
        (user) =>
          user.telegramBlock.telegramName === req.body.message.chat.username
      );

      if (user && !user.telegramBlock.chatId) {
        await updateChatId(user, req.body.message.chat.id);
        const message = 'Вы будете получать уведомления о заказах';
        const ret = await fetch(
          `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}`
        );
      } else if (user.telegramBlock.chatId) {
        const message = 'Вы уже подписаны на рассылку уведомлений о заказах';
        const ret = await fetch(
          `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}`
        );
      } else {
        const message =
          'Вашего имени нет в базе данных. Вы не будите получать уведомления о заказах';
        const ret = await fetch(
          `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}`
        );
      }
    } else if (req.body.message?.text.match(/\d+/gmi)?.length) {
      const orderNumber = req.body.message?.text.match(/\d+/gmi)[0];
      const order = await getOrderStatus(`order-N${orderNumber}`, req.body.message.chat.id);
      if (order?.user?.chatId && order.user.chatId === `${req.body.message.chat.id}`) {
        const message = `
        Номер заказа: ${order.OrderNumber};
        Текущий статус: ${order.status};
        Номер платежа в системе Ассист: ${order.billnumber};
        Сумма заказа: ${order.OrderAmount};
        `;

        const ret = await fetch(
          `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${
            req.body.message.chat.id
          }&text=${encodeURIComponent(message)}`
        );
      }
    }

    return res.status(200).send('OK');
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
