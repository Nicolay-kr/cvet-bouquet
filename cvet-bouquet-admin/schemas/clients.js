import { BsFillPeopleFill } from 'react-icons/bs'

export default {
  name: 'clients',
  title: 'Клиенты',
  type: 'document',
  icon:BsFillPeopleFill,
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
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'registratiom',
      title: 'Зарегистрирован',
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
    },
    prepare: ({ name, phone, email }) => {
      // console.log(category)
      return {
        title: `${name} `,
        // subtitle: `Категория: ${category.title}`,
        subtitle: `${phone}, ${email}`,
      };
    },
  },
};
