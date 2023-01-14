// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {updateOrder} from '../../src/utils/sanityMethods/updateOrder';


export default function handler(req, res) {
  const data = JSON.parse(req.body)
  if(data.Merchant_ID){
    res.status(200).send(`order wasn update`, data)
  }else{
    res.status(500).send(`order wasn't update. Error`);
  }
}
