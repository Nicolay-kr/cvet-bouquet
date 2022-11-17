import { GiFlowers } from 'react-icons/gi'


export default {
  name: 'categoryList',
  title: 'Список категории букетов',
  type: 'document',
  icon:GiFlowers,
  fields: [
    {
      name: 'categories',
      title: 'Список категорий букетов',
      type: 'array',
      of: [
        {
          type: 'reference',
          title:'Выбрать из существующих',
          to: [
            {type: 'category'},
          ]
        },
        {
          type: 'category',
          title:'Добавить новую',
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
  // preview: {
  //   select: {
  //     title: 'title',
  //     media: 'mainImage',
  //   },
  // },
};
