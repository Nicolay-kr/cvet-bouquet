// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import isJson from '../../src/utils/isJson';
import {updateOrder} from '../../src/utils/sanityMethods/updateOrder';


export default function handler(req, res) {
  try{
    const data = isJson(req.body)?JSON.parse(req.body):req.body;
    const id = data.ordernumber.split('-').slice(2).join('');
    const status = data.orderstate;
    if(id){
      updateOrder(id, status)
      .then(()=>res.status(200).send(`Success. Order with id ${id} was update`))
      .catch(e=>res.status(500).send(`order wasn't update. Error: ${e}`))
    }else{
      res.status(500).send(`order with ${id} wasn't found.`)
    }
  }catch(e){
    res.status(500).send(`Order wasn't update. ${e}`)
  }

}
