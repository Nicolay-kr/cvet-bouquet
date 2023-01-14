export const sendMessageAboutOrder = (orderInfo) => {
  fetch('https://formspree.io/f/xbjerqyo', {
    method: 'POST',
    body: JSON.stringify({ 
      ...orderInfo,
    }),
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      console.log('Email was sent', response);
    })
    .catch((error) => {
      console.log('Email about order  was not sent. Error ', error);
    });
};
