import { GiFlowers } from 'react-icons/gi'


export default {
  name: 'category',
  title: 'Категории букетов',
  type: 'document',
  icon:GiFlowers,
  fields: [
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
        source: 'title',
        maxLength: 96,
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
    // {
    //   name: 'description',
    //   title: 'Описание',
    //   type: 'text',
    // },
    {
      name: 'bouqets',
      title: 'Букеты',
      type: 'array',
      of: [
        {
          type: 'reference',
          title:'Выбрать из существующих',
          to: [
            {type: 'bouquet'},
          ]
        },
        {
          type: 'bouquet',
          title:'Добавить новый',
          options: {
            hotspot: true,
          },
        },
      ],
    },

    // {
    //   name: 'parents',
    //   title: 'Parent categories',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{type: 'category'}],
    //     },
    //   ],
    // },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
};
