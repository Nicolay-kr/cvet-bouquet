export const messageFormatter = (orderInfo) => {
  return orderInfo.orderType === 'Свободный платеж'
    ? `
          Номер заказа: ${orderInfo.OrderNumber},
          Статус: ${orderInfo.status},
          Сумма: ${orderInfo.OrderAmount},
          Имя: ${orderInfo.name},
          Телефон: ${orderInfo.phone},
          Email: ${orderInfo.email},
          Сообщение: ${orderInfo.comment},
        `
    : `
        Номер заказа: ${orderInfo.OrderNumber},
        Статус: ${orderInfo.status},
        Тип заказа: ${orderInfo.orderType},
        Сумма: ${orderInfo.OrderAmount},
        Платежный метод: ${orderInfo.paymentType},
        Имя: ${orderInfo.name},
        Телефон: ${orderInfo.phone},
        Email: ${orderInfo.email},
        Имя получателя: ${orderInfo.recipientName},
        Телефон получателя: ${orderInfo.recipientPhone},
        Состав заказа: ${orderInfo.orderlist},
        Тип доставки: ${orderInfo.deliveryType},
        Дата доставки: ${orderInfo.date},
        Время доставки: ${orderInfo.time},
        Улица: ${orderInfo.street},
        Дом: ${orderInfo.house},
        Подъезд: ${orderInfo.enter},
        Этаж: ${orderInfo.floor},
        Квартира: ${orderInfo.flat},
        Место самовывоза: ${orderInfo.deliveryPlace},
        Получатель: ${orderInfo.recipient},
        Дата регистрации: ${orderInfo.registration},
        Сообщение: ${orderInfo.comment},
      `;
};
