// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {updateOrder} from '../../src/utils/sanityMethods/updateOrder';


export default function handler(req, res) {
  const answer = JSON.parse(req.body)
  console.log(req)
  if(answer.ordernumber){
    updateOrder('lc4h3o9t')
  }

  res.status(200).json(req.body)
}
