import { sanityClient } from '../../sanity';


const getUsers = async () => {
  const users = await sanityClient.fetch(
    `*[ _type == "users"]{
      _id,
      active,
      name,
      emailBlock,
      telegramBlock,
    }`
  );
  return users;
};

export default getUsers;
