export const createPayment = (paymentIfo) => {
  const paymentData = {
    ...paymentIfo,
    OrderCurrency: 'BYN',
    Merchant_ID: process.env.MERCHANT_ID,
    URL_RETURN_OK: 'https://cvet-bouquet-nicolay-kr.vercel.app/cart',
  };
  console.log(paymentData);
  return fetch(`${process.env.SERVER_NAME}`, {
    method: 'POST',
    body: JSON.stringify(paymentData),
    headers: {
      Accept: 'application/json',
    },
  });
};
