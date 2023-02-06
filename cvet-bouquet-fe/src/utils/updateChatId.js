// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sanityClient } from '../../sanity';

export default async function updateChatId(userIdd,chatId) {
  return await sanityClient
    .patch(userIdd)
    .set({ telegramBlock: { chatId: chatId } })
    .commit();
}
