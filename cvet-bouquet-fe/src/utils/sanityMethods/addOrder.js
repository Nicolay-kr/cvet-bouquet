import { sanityClient } from '../../../sanity';
import uniqid from 'uniqid';

const addOrder = async (doc) => {
  const data = {
    ...doc,
    _id: uniqid(),
    _type: 'orders',
  }

  sanityClient
    .createIfNotExists(data)
    .then((res) => {
      console.log('Order was created (or was already present)');
    })
    .catch((error) => console.log(error));
};

export default addOrder;