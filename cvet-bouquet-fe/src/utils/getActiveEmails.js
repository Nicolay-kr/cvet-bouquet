import { sanityClient } from '../../sanity';


const getActiveEmails = async () => {
  const users = await sanityClient.fetch(
    `*[ _type == "users" && active == true && emailBlock.emailAllow == true ]{
      _id,
      active,
      emailBlock,
    }`
  );
  const emails = []
  users.forEach(user=>emails.push(user.emailBlock.email))
  return emails;
};

export default getActiveEmails;