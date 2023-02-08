
async function getInstagramPost(){
  const instagramUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`;
  const dataInst = await fetch(instagramUrl);
  const instagramPosts = await dataInst.json();
  return instagramPosts;
  
}
export default getInstagramPost;