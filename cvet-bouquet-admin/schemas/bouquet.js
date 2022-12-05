import { BsFlower1 } from 'react-icons/bs';

export default {
  name: 'bouquet',
  title: 'Список всех букетов',
  type: 'document',
  icon: BsFlower1,
  initialValue: () => ({
    publishedAt: new Date().toISOString(),
    // delivery: [
    //   {
    //     _type: 'deliveryGeneral',
    //     delivery: {
    //       _ref: '0d17fade-a7e4-4454-95bd-040d7028e93e',
    //       _type: 'reference',
    //     },
    //   },
    // ],
  }),
  fields: [
    {
      title: 'Отображать на сайте',
      name: 'published',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'title',
      title: 'Название',
      type: 'localeString',
      validation: (Rule) => Rule.required().error('Поле должно быть заполнено'),
    },
    // {
    //   name: 'category',
    //   title: 'Категория',
    //   type: 'reference',
    //   to: { type: 'category' },
    // },
    {
      name: 'slug',
      title: 'Ссылка',
      type: 'slug',
      description: 'Поле для url адреса',
      initialValue: 'This string',
      validation: (Rule) =>
        Rule.required().error(
          'Поле должно быть заполнено, пожалуйста нажмите кнопку Generate'
        ),
      options: {
        // source: 'title.ru',
        maxLength: 96,
        source: async (doc, options) => {
          if (doc.categories) {
            return `${options.parent.title.ru}`;
          } else {
            return `${doc.title.ru}`;
          }
        },
        // isUnique:true,
      },
    },
    {
      name: 'price',
      title: 'Стоимость',
      type: 'number',
      validation: (Rule) =>
        Rule.required().error('Стоимость должна быть указана'),
    },
    // {
    //   name: 'mainImage',
    //   title: 'Главное Изображение',
    //   type: 'image',
    // },
    {
      name: 'images',
      title: 'Изображения',
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
      name: 'description',
      title: 'Описание',
      type: 'localeBlockContent',
    },
    {
      name: 'care',
      title: 'Уход за букетом',
      type: 'localeBlockContent',
    },
    {
      name: 'delivery',
      title: 'Доставка',
      type: 'reference',
      to: { type: 'deliveryGeneral' },
    },
    {
      name: 'publishedAt',
      title: 'Создан',
      type: 'datetime',
      readOnly: true,
    },
    // {
    //   name: 'delivery',
    //   title: 'Доставка',
    //   type: 'localeBlockContent',
    // },
    // {
    //   name: 'bouquetCare',
    //   title: 'Уход за букетом',
    //   type: 'localeBlockContent',
    // },

    // {
    //   title: 'Tags',
    //   name: 'tags',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'string',
    //     },
    //   ],
    //   options: {
    //     layout: 'tags',
    //   },
    // },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
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
      category: 'category',
    },
    prepare: ({ title, category, price, images }) => {
      return {
        title: `${title} `,
        // subtitle: `Категория: ${category.title}`,
        subtitle: `${price}руб`,
        media: images[0],
      };
    },
  },
};
