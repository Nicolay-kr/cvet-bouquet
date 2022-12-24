import { IoMdPricetag } from 'react-icons/io'


export default {
  name: 'promocode',
  title: 'Промокоды',
  type: 'document',
  icon:IoMdPricetag,
  fields: [
    {
      title: 'Активный',
      name: 'active',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'title',
      title: 'Название',
      type: 'string',
    },
    {
      name: 'code',
      title: 'Код',
      type: 'string',
    },
    {
      name: 'percent',
      title: 'Процент',
      type: 'number',
    },

  ],
  preview: {
    select: {
      title: 'title',
      active:'active',
    },
    prepare: ({ title,active  }) => {
      return {
        title: `${title}`,
        subtitle: `${active? 'Активен': 'Не активен'}`,
      };
    },
  },
};
