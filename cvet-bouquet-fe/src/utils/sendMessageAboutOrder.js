export const sendMessageAboutOrder = (orderInfo) => {
  return fetch('https://formspree.io/f/xbjerqyo', {
    method: 'POST',
    body: JSON.stringify({ 
      ...orderInfo,
    }),
    headers: {
      Accept: 'application/json',
    },
  })
};
