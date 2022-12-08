import { AiFillSetting } from 'react-icons/ai';

export default {
  name: 'generalInfo',
  title: 'Общая информация',
  type: 'document',
  icon: AiFillSetting,
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
      name: 'shopsList',
      title: 'Магазины',
      type: 'array',
      of: [
        {
          type: 'shops',
          title:'Добавить новый магазин',
          options: {
            hotspot: true,
          },
        },
      ],
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
  //     return {
  //       title: `${name} `,
  //       // subtitle: `Категория: ${category.title}`,
  //       subtitle: `${phone}, ${email}`,
  //     };
  //   },
  // },
};
