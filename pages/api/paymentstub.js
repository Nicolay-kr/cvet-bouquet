// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import logger from '../../services/logger';
import isJson from '../../src/utils/isJson';


export default function handler(req, res) {
  try{
    const data = isJson(req.body)?JSON.parse(req.body):req.body;
    if(data.Merchant_ID){
      return res.status(200).send(`Payment was initialize`, JSON.stringify(data))
    }else{
      return res.status(500).send(`order wasn't update. Error`);
    }

  }catch(e){
    logger.error(e.stack);
    return res.status(500).send(`order wasn't update. ${e}`);
  }
 
}
