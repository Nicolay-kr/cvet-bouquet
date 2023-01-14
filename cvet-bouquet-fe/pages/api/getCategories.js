// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCategories } from '../../src/utils/sanityMethods/getCategories';

export default async function handler(req, res) {
  try {
    const categories = await getCategories();
    res.status(200).send(categories);
  } catch (e) {
    res.status(500).send({ error: 'failed to load data' });
  }
}
