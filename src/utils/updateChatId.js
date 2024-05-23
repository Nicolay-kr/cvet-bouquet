// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sanityClient } from '../../sanity';

export default async function updateChatId(user, chatId) {
  return await sanityClient
    .patch(user._id)
    .set({
      telegramBlock: {
        telegramAllow: user.telegramBlock.telegramAllow,
        telegramName: user.telegramBlock.telegramName,
        chatId: `${chatId}`,
      },
    })
    .commit();
}
