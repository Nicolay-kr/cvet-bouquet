// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sanityClient } from '../../sanity';

export default async function updateChatId(user, chatId) {
  return await sanityClient
    .patch(user.id)
    .set({
      telegramBlock: {
        telegramAllow: user.telegramAllow,
        telegramName: user.telegramName,
        chatId: `${chatId}`,
      },
    })
    .commit();
}
