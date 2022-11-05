export default {
  name: 'bouquet',
  title: 'Букеты',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'localeString',
      validation: Rule => Rule.required().error('Поле должно быть заполнено'),
    },
    {
      name: 'category',
      title: 'Категория',
      type: 'reference',
      to: { type: 'category' },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required().error('Поле должно быть заполнено, пожалуйста нажмите кнопку Generate'),
      options: {
        source: 'title.ru',
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
      validation: Rule => Rule.required().error('Стоимость должна быть указана')
    },
    // {
    //   name: 'mainImage',
    //   title: 'Главное Изображение',
    //   type: 'image',
    // },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          name: 'image',
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
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
  ],
  // orderings: [
  //   {
  //     title: 'Release Date, New',
  //     name: 'releaseDateDesc',
  //     by: [
  //       {field: 'releaseDate', direction: 'desc'}
  //     ]
  //   },
  //   {
  //     title: 'Release Date, Old',
  //     name: 'releaseDateAsc',
  //     by: [
  //       {field: 'releaseDate', direction: 'asc'}
  //     ]
  //   },
  //   {
  //     title: 'Категория',
  //     name: 'category',
  //     by: [
  //       {field: 'category', direction: 'desc'}
  //     ]
  //   }
  // ],

  preview: {
    select: {
      title: 'title.ru',
      price: 'price',
      images: 'images',
      category: 'category'
    },
    prepare: ({ title, category, price, images }) => {
      console.log(category)
      return {
        title: `${title} `,
        // subtitle: `Категория: ${category.title}`,
        subtitle: `${price}руб`,
        media: images[0],
      };
    },
  },
};
