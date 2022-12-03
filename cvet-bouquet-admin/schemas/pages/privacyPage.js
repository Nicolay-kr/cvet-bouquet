export default {
  name: 'privacyPage',
  title: 'Политика конфиденциальности',
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


  ],
  // preview: {
  //   select: {
  //     title: 'title',
  //   },
  // },
};
