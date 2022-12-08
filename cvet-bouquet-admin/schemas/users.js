import { BsFillPeopleFill } from 'react-icons/bs'

export default {
  name: 'users',
  title: 'Пользователи',
  type: 'document',
  icon:BsFillPeopleFill,
  fields: [
    {
      title: 'Активный',
      name: 'active',
      type: 'boolean',
      initialValue: true,
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
      return {
        title: `${name} `,
        // subtitle: `Категория: ${category.title}`,
        subtitle: `${phone}, ${email}`,
      };
    },
  },
};
