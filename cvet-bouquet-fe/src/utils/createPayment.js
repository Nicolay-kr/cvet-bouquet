export const createPayment = (paymentIfo) => {
  fetch(`${process.env.SERVER_NAME}`, {
    method: 'POST',
    body: JSON.stringify({
      ...paymentIfo,
      Merchant_ID: process.env.MERCHANT_ID,
      URL_RETURN_OK: 'https://cvet-bouquet-nicolay-kr.vercel.app/cart',
    }),
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      console.log('response', response);
    })
    .catch((error) => {
      console.log('error', error);
    });
};
