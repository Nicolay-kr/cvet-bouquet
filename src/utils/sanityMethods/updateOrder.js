import { sanityClient } from '../../../sanity';

export const updateOrder = async (id, status) => {
  sanityClient
  .patch(id) // Document ID to patch
  .set({status: status}) // Shallow merge
  .commit() // Perform the patch and return a promise
  .then((data) => {
    console.log(`Order status was update. Data ${data}`)
  })
  .catch((err) => {
    console.error('Oh no, the update failed: ', err.message)
  })
}