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


    // {
    //   name: 'parents',
    //   title: 'Parent categories',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{type: 'category'}],
    //     },
    //   ],
    // },
  ],
  // preview: {
  //   select: {
  //     title: 'title',
  //     media: 'mainImage',
  //   },
  // },
  preview: {
    select: {
      name: 'name',
      phone: 'phone',
      email: 'email',
      bouquet:'bouquet',
    },
    prepare: ({ name, phone, email, bouquet }) => {
      return {
        title: `${name}. ${bouquet} `,
        // subtitle: `Категория: ${category.title}`,
        subtitle: `${phone}, ${email}`,
      };
    },
  },
};
