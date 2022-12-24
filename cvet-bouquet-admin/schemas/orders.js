import { MdPaid } from 'react-icons/md'

export default {
  name: 'orders',
  title: 'Заказы',
  type: 'document',
  icon:MdPaid,
  fields: [
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
      name: 'status',
      title: 'Статус',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'bouquet',
      title: 'Букет',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Cтоимость',
      type: 'string',
    },
    {
      name: 'paymentType',
      title: 'Платежный метод',
      type: 'string',
    },
    {
      name: 'registration',
      title: 'Создан',
      type: 'datetime',
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
    },
    prepare: ({ name, status, paymentType}) => {
      return {
        title: `${name} `,
        subtitle: paymentType==='Онлайн'? `Онлайн. Статус: ${status}`:'Наличные',
      };
    },
  },
};
