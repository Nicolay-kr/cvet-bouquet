export default {
  name: 'corporateclientsPage',
  title: 'Контакты',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeString',
    },

    {
      name: 'text',
      title: 'Текст',
      type: 'localeBlockContent',
    },
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
    {
      title: 'Наши преимущества',
      name: 'advantages',
      type: 'array',
      of: [
        {
          title: 'Наши преимущества',
          name: 'advantages',
          type: 'object',
          fields: [
            {
              title: 'Отображать на сайте',
              name: 'published',
              type: 'boolean',
            },
            { name: 'title', type: 'localeString', title: 'Название преимущества' },
            { name: 'desc', type: 'localeBlockContent', title: 'Описание преимущества' },
          ],
        },
      ],
      preview: {
        select: {
          title: 'title.ru',
        }
      }
    },
  ],

};
