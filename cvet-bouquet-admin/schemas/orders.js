import { MdPaid } from 'react-icons/md'

export default {
  name: 'orders',
  title: 'Заказы',
  type: 'document',
  readOnly: true,
  icon:MdPaid,
  initialValue: () => ({
    registration: new Date().toISOString(),

  }),
  fields: [
    {
      name: 'OrderNumber',
      title: 'Номер заказа',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'status',
      title: 'Статус платежа',
      type: 'string',
    },
    {
      name: 'billnumber',
      title: 'Номер платежа в системе Ассист',
      type: 'string',
    },
    {
      name: 'orderType',
      title: 'Тип заказа',
      type: 'string',
    },
    {
      name: 'OrderAmount',
      title: 'Cтоимость',
      type: 'string',
    },
    {
      name: 'promocode',
      title: 'Промокод',
      type: 'string',
    },
    {
      name: 'paymentType',
      title: 'Платежный метод',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Имя',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Телефон',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'recipientName',
      title: 'Имя получателя',
      type: 'string',
    },
    {
      name: 'recipientPhone',
      title: 'Телефон получателя',
      type: 'string',
    },
    {
      name: 'orderlist',
      title: 'Состав заказа',
      type: 'text',
    },
    {
      name: 'deliveryType',
      title: 'Тип доставки',
      type: 'string',
    },
    {
      name: 'deliveryPlace',
      title: 'Место самовывоза',
      type: 'string',
    },
    {
      name: 'comment',
      title: 'Комментарий к заказу',
      type: 'text',
    },
    {
      name: 'date',
      title: 'Дата Получения',
      type: 'string',
  
    },
    {
      name: 'time',
      title: 'Время Получения',
      type: 'string',
  
    },
    {
      name: 'street',
      title: 'Улица',
      type: 'string',
    },
    {
      name: 'house',
      title: 'Дом',
      type: 'string',
    },
    {
      name: 'enter',
      title: 'Подъезд',
      type: 'string',
    },
    {
      name: 'floor',
      title: 'Этаж',
      type: 'string',
    },
    {
      name: 'flat',
      title: 'Квартира',
      type: 'string',
    },
    {
      name: 'registration',
      title: 'Создан',
      type: 'datetime',
      readOnly: true,
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today'
      }
    },
  ],
  preview: {
    select: {
      name: 'name',
      phone: 'phone',
      paymentType: 'paymentType',
      status:'status',
      OrderNumber:'OrderNumber',
    },
    prepare: ({ name, status, paymentType, OrderNumber}) => {
      return {
        title: `${name} заказ: ${OrderNumber} `,
        subtitle: paymentType==='Онлайн оплата'? `Онлайн. Статус: ${status}`:'Наличные',
      };
    },
  },
};
