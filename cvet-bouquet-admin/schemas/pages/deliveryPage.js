export default {
  name: 'deliveryPage',
  title: 'Доставка и оплата',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'localeString',
      // validation: Rule => Rule.required().error('Поле должно быть заполнено'),
    },

    {
      name: 'text1',
      title: 'Текст условия доставки',
      type: 'localeBlockContent',
    },

    {
      name: 'text2',
      title: 'Текст самовывоз из салона',
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
      title: 'Способы и условия оплаты',
      name: 'conditions',
      type: 'array',
      of: [
        {
          title: 'Способ или условие оплаты',
          name: 'condition',
          type: 'object',
          fields: [
            {
              title: 'Отображать на сайте',
              name: 'published',
              type: 'boolean',
            },
            { name: 'title', type: 'localeString', title: 'Название способа' },
            { name: 'desc', type: 'localeBlockContent', title: 'Описание' },
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
