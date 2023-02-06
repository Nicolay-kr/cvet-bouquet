import getUsers from '../../src/utils/getUsers';
import updateChatId from '../../src/utils/updateChatId';

export default async (req, res) => {
  const tgbot = process.env.TELEGRAM_TOKEN;
  console.log(req.body.message);
  try {
    if (req.body.message?.text === '/start') {
      const users = await getUsers();
      const user = users.find(
        (user) =>
          user.telegramBlock.telegramName === req.body.message.chat.username
      );

      if(user){
        await updateChatId(user,req.body.message.chat.id)
        const message = 'Вы будите получать уведомления о заказах';
        const ret = await fetch(
          `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}`
        );
      }else{
        const message = 'Вашего имени нет в базе данных. Вы не будите получать уведомления о заказах';
        const ret = await fetch(
          `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}`
        );
      }
    }

    return res.status(200).send('OK');
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
