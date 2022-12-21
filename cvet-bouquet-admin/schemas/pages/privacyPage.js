export default {
  name: 'privacyPage',
  title: 'Политика конфиденциальности',
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


  ],
};
