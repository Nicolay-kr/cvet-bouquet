import { sanityClient } from '../../../sanity';

export const updateOrder = async (id) => {
  sanityClient
  .patch(id) // Document ID to patch
  .set({status: 'Исполнен'}) // Shallow merge
  .commit() // Perform the patch and return a promise
  .then((data) => {
    console.log('Orer status was update')
  })
  .catch((err) => {
    console.error('Oh no, the update failed: ', err.message)
  })
}