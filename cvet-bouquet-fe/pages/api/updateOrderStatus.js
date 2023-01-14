// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {updateOrder} from '../../src/utils/sanityMethods/updateOrder';


export default function handler(req, res) {
  const data = JSON.parse(req.body)
  const id = data.ordernumber.split('-').slice(2).join('');
  const status = data.orderstate;
  if(id){
    updateOrder(id,status)
    .then(()=>res.status(200).send('success'))
    .catch(e=>res.status(500).send(`order wasn't update. Error: ${e}`))
  }
}
