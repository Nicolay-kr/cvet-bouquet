export default {
  name: 'aboutusPage',
  title: 'О нас страница',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeString',
      // validation: Rule => Rule.required().error('Поле должно быть заполнено'),
    },

    {
      title: 'Блок о нас ',
      name: 'aboutusBlock',
      type: 'object',
      fields: [
        {
          name: 'articles',
          type: 'array',
          title: 'Текстовые блоки',
          of: [
            {
              title: 'Блок о нас ',
              name: 'aboutusBlock',
              type: 'object',
              fields: [
                {
                  name: 'title',
                  type: 'localeString',
                  title: 'Заголовок текстового блока',
                },
                {
                  name: 'text',
                  type: 'localeBlockContent',
                  title: 'Текст текстового блока',
                },
              ],
              preview: {
                select: {
                  title: 'title.ru',
                },
              },
            },
          ],
       
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
      ],
    },
  ],
};
