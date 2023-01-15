import { AiFillShop } from 'react-icons/ai'


export default {
  name: 'shops',
  title: 'Магазины',
  type: 'document',
  icon:AiFillShop,
  fields: [
    {
      title: 'Отображать на сайте',
      name: 'published',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'adress',
      title: 'Адрес магазина',
      type: 'string',
    },
    {
      name: 'time',
      title: 'Время Работы',
      type: 'string',
    },
    {
      name: 'metro',
      title: 'Ближайшая станция метро',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Координаты магазина',
      type: 'geopoint',
    },

  ],
  preview: {
    select: {
      adress: 'adress',
      time:'time',
      published:'published',
    },
    prepare: ({ adress, time,published  }) => {
      return {
        title: `${adress} ${published? '(Работает)': '(Не работает)'} `,
        subtitle: time,
      };
    },
  },
};
