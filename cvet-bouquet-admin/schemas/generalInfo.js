import { AiFillSetting } from 'react-icons/ai'

export default {
  name: 'generalInfo',
  title: 'Общая информация',
  type: 'document',
  icon:AiFillSetting,
  fields: [
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
      name: 'adress',
      title: 'Aдресс',
      type: 'string',
    },
    {
      name: 'worktime',
      title: 'Режим работы',
      type: 'string',
    },
    {
      name: 'requisites',
      title: 'Реквизиты',
      type: 'string',
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
    },
    {
      name: 'telegram',
      title: 'Telegram',
      type: 'string',
    },
    {
      name: 'viber',
      title: 'Viber',
      type: 'string',
    },
    {
      name: 'whatsapp',
      title: 'Whatsapp',
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
  // preview: {
  //   select: {
  //     name: 'name',
  //     phone: 'phone',
  //     email: 'email',
  //   },
  //   prepare: ({ name, phone, email }) => {
  //     // console.log(category)
  //     return {
  //       title: `${name} `,
  //       // subtitle: `Категория: ${category.title}`,
  //       subtitle: `${phone}, ${email}`,
  //     };
  //   },
  // },
};
