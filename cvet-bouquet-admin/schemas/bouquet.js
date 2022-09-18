export default {
  name: 'bouquet',
  title: 'Букеты',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'localeString',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'localeBlockContent',
    },
    {
      name: 'delivery',
      title: 'Доставка',
      type: 'localeBlockContent',
    },
    {
      name: 'price',
      title: 'Стоимость',
      type: 'number',
    },
    {
      name: 'mainImage',
      title: 'Главное Изображение',
      type: 'image',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },

    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    },
  ],

  preview: {
    select: {
      title: 'title.ru',
      subtitle: 'price',
      media: 'mainImage',
    },
  },
}
