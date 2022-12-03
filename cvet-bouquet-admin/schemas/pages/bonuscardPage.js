export default {
  name: 'bonuscardPage',
  title: 'Бонусная карта',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeString',
    },

    {
      name: 'text1',
      title: 'Блок Система скидок',
      type: 'localeBlockContent',
    },

    {
      name: 'text2',
      title: 'Блок Важно',
      type: 'localeBlockContent',
    },
  ],

};
