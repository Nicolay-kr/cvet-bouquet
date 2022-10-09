import category from './category'

export default {
  name: 'category',
  title: 'Категории',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'string',
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
      type: 'text',
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
    },
  }
}
