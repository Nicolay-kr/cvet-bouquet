export default {
  name: 'eposPage',
  title: 'Е-POS оплата',
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
      name: 'link',
      title: 'Ссылка для оплаты:',
      type: 'string',
      // validation: Rule => Rule.required().error('Поле должно быть заполнено'),
    },
    {
      name: 'code',
      title: 'Ерип код',
      type: 'string',
    },
  ],
  // preview: {
  //   select: {
  //     title: 'title',
  //   },
  // },
};
