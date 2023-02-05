
export default async (req, res) => {

  const tgbot = process.env.TELEGRAM_TOKEN;
  console.log(req.body)
  try{
    if (req.body.message.text === '/start') {
      console.log('inside start')
      console.log(req.body.message.chat.id)
      const message ='To get a list of commands sends /help';
      console.log(message)
      const ret = await fetch(
        `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}`
      );
    }
    if (req.body.message.text === '/help') {
      console.log('inside help')
      console.log(req.body.message.chat.id)
      const message ='Help for NextJS News Channel keyword to search for keyword in my Medium publication';
      console.log(message)
      const ret = await fetch(
        `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}`
      );
    }
    res.status(200).send('OK');

  }catch(e){
    console.log(e)
    res.status(500).send(e);
  }

};