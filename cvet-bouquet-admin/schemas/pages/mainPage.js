export default {
  name: 'mainPage',
  title: 'Главная страница',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок страницы',
      type: 'localeString',
    },

    {
      title: 'Первый Блок',
      name: 'firstBlock',
      type: 'object',
      fields: [
        {
          title: 'Отображать на сайте',
          name: 'published',
          type: 'boolean',
        },
        { name: 'text', type: 'localeBlockContent', title: 'Описание' },
        {
          name: 'mainImage',
          title: 'Первое изображение',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'secondImage',
          title: 'Второе изображение',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },

    {
      title: 'Второй Блок',
      name: 'secondBlock',
      type: 'object',
      fields: [
        {
          title: 'Отображать на сайте',
          name: 'published',
          type: 'boolean',
        },
        { name: 'text', type: 'localeBlockContent', title: 'Описание' },
        {
          name: 'mainImage',
          title: 'Первое изображение',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'secondImage',
          title: 'Второе изображение',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'popularBouqets',
      title: 'Популярные букеты',
      type: 'array',
      of: [
        {
          type: 'reference',
          title:'Выбрать из существующих',
          to: [
            {type: 'bouquet'},
          ]
        },
      ],
    },
  ],

};
