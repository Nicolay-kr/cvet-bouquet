export default {
  name: 'mainPage',
  title: 'Главная страница',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeBlockContent',
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
