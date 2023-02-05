export default async (req, res) => {
  const tgbot = process.env.TELEGRAM_TOKEN;
  console.log(req.body);
  try {
    if (req.body.message?.text === '/start') {
      console.log('inside start');
      console.log(req.body.message.chat.id);
      const message = 'To get a list of commands sends /help';
      console.log(message);
      const ret = await fetch(
        `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}`
      );
    }
    if (req.body.message?.text === '/help') {
      console.log('inside help');
      console.log('TELEGRAM_TOKEN', process.env.TELEGRAM_TOKEN);
      console.log(req.body.message.chat.id);
      const message =
        'Help for NextJS News Channel keyword to search for keyword in my Medium publication';
      console.log(message);
      const ret = await fetch(
        `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}`
      );
    }
    // if (req.body.message?.text === '/test') {
      console.log('TELEGRAM_TOKEN', process.env.TELEGRAM_TOKEN);
      console.log(req.body.message.chat.id);
      await fetch(
        'https://api.telegram.org/bot6123262918:AAETDuStLhRBZUsvfKFh2HA-6KyalCDrKuw/sendMessage?chat_id=336711852&text=customtext'
      )
        // .then((response) => console.log('response: ', response))
        // .catch((error) => console.log('error: ', error));
    // }
    return res.status(200).send('OK');
    // return res.status(200).send('OK');
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
