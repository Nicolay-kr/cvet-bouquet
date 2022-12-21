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
          to: [
            {type: 'category'},
          ]
        },
      ],
    },
  ],
};
