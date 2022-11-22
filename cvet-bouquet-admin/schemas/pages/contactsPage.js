export default {
  name: 'contactsPage',
  title: 'Контакты',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeString',
      // validation: Rule => Rule.required().error('Поле должно быть заполнено'),
    },
    {
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'string',
    },
  ],
  // preview: {
  //   select: {
  //     title: 'title',
  //   },
  // },
};
