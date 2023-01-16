export const sendMessageAboutOrder = (orderInfo) => {
  const handledorderInfo =
    orderInfo.orderType === 'Свободный платеж'
      ? {
          'Номер заказа': orderInfo.OrderNumber,
          'Статус': orderInfo.status,
          'Сумма': orderInfo.OrderAmount,
          'Имя': orderInfo.name,
          'Телефон': orderInfo.phone,
          'Email': orderInfo.email,
          'Сообщение': orderInfo.comment,
        }
      : {
        'Номер заказа': orderInfo.OrderNumber,
        'Статус': orderInfo.status,
        'Тип заказа': orderInfo.orderType,
        'Сумма': orderInfo.OrderAmount,
        'Платежный метод': orderInfo.paymentType,
        'Имя': orderInfo.name,
        'Телефон': orderInfo.phone,
        'Email': orderInfo.email,
        'Сообщение': orderInfo.comment,
        'Состав заказа': orderInfo.orderlist,
        'Тип доставки': orderInfo.deliveryType,
        'Дата доставки': orderInfo.date,
        'Время доставки': orderInfo.time,
        'Улица': orderInfo.street,
        'Дом': orderInfo.house,
        'Подъезд': orderInfo.enter,
        'Этаж': orderInfo.floor,
        'Квартира': orderInfo.flat,
        'Место самовывоза': orderInfo.deliveryPlace,
        'Получатель': orderInfo.recipient,
        'Дата регистрации': orderInfo.registration,
      };

  const messageUrl =
    orderInfo.orderType === 'Свободный платеж'
      ? 'https://formspree.io/f/mrgvzrkp'
      : 'https://formspree.io/f/xbjerqyo';
  return fetch(messageUrl, {
    method: 'POST',
    body: JSON.stringify({
      ...handledorderInfo,
    }),
    headers: {
      Accept: 'application/json',
    },
  });
};
