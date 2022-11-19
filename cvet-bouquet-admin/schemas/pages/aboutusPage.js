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
  ],
  // preview: {
  //   select: {
  //     title: 'title',
  //   },
  // },
};
