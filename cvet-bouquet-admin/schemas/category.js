import { GiFlowers } from 'react-icons/gi'
import client from 'part:@sanity/base/client';


export default {
  name: 'category',
  title: 'Категории букетов',
  type: 'document',
  icon:GiFlowers,
  fields: [
    {
      title: 'Отображать на сайте',
      name: 'published',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'title',
      title: 'Название категории',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Ссылка',
      type: 'slug',
      description:'Поле для url адреса',
      validation: Rule => Rule.required().error('Поле должно быть заполнено, пожалуйста нажмите кнопку Generate'),
      options: {
        maxLength: 96,
        source: async (doc,options) => {
          return `${options.parent.title}`;
        },
      },
    },
    {
      name: 'mainImage',
      title: 'Изображение категории',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bouqets',
      title: 'Букеты',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'bouquet'},
          ]
        },

      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
};
