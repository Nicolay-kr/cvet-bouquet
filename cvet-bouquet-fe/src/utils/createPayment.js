export const createPayment = (paymentIfo) => {
  return fetch(`${process.env.SERVER_NAME}`, {
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
};
