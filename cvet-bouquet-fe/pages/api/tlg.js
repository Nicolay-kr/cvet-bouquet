
export default async (req, res) => {

  const tgbot = process.env.TELEGRAM_TOKEN;
  console.log(req.body.message)
  try{
    if (req.body.message?.text === '/start') {
      console.log('message',req.body.message?.text)
      const message = 'hello from NextJS'
      const ret = await fetch(
        `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}`
      );
      console.log(ret)
      
    }
    if (req.body.message?.text === '/help') {
      console.log('message',req.body.message?.text)
      const message = 'hello from NextJS';
      const ret = await fetch(
        `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}`
      );
      console.log(ret)
    }
    return res.status(200).send('OK');

  }catch(e){
    console.log(e)
    return res.status(500).send(e);
  }

};
