// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sanityClient } from '../../sanity';
import isJson from '../../src/utils/isJson';

export default async function handler(req, res) {
  try {
    const data = isJson(req.body) ? JSON.parse(req.body) : req.body;
    const order = await sanityClient.fetch(
      `*[ _type == "orders" && OrderNumber == "${data.ordernumber}"][0]{
        _id,
      }`
    );
    const id = order._id;
    let status;
    if(data.orderstate === 'Approved'){
      status = 'Оплачен';
    }else if (data.orderstate === 'Declined'){
      status = 'Отклонен';
    }else{
      status = data.orderstate;
    }
    const billnumber = data.billnumber;
    if (id && data.merchant_id === process.env.MERCHANT_ID) {
      await sanityClient
        .patch(id) // Document ID to patch
        .set({ status: status, billnumber: billnumber, }) // Shallow merge
        .commit();
      return res.status(200).send(`Success. Order with id ${id} was update`);
    } else {
      return res.status(500).send(`order with ${id} wasn't found.`);
    }
  } catch (e) {
    return res.status(500).send(`Order wasn't update. ${e}`);
  }
}
