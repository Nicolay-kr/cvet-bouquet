import { AiFillSetting } from 'react-icons/ai';

export default {
  name: 'generalInfo',
  title: 'Общая информация',
  type: 'document',
  icon: AiFillSetting,
  fields: [
    {
      name: 'phone',
      title: 'Телефон',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'shopsList',
      title: 'Магазины',
      type: 'array',
      of: [
        {
          type: 'shops',
          title:'Добавить новый магазин',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'instagramBlock',
      title: 'Блок инстаграм',
      type: 'array',
      validation: (Rule) => Rule.max(6).error('Максимальное количество изображений 6шт. Удалите лишнее изображенее'),
      of: [
        {
          type: 'image',
          title:'Добавить изображение',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'orgInfo',
      title: 'Информация об организации',
      type: 'localeBlockContent',
    },
    {
      name: 'requisites',
      title: 'Реквизиты',
      type: 'string',
    },
    {
      name: 'deliveryPrice',
      title: 'Стоимость доставки (BYN)',
      type: 'number',
    },
    {
      name: 'deliveryMin',
      title: 'Минимальная соимость букета при бесплатной доставке (BYN).',
      type: 'number',
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
    },
    {
      name: 'telegram',
      title: 'Telegram',
      type: 'string',
    },
    {
      name: 'viber',
      title: 'Viber',
      type: 'string',
    },
    {
      name: 'whatsapp',
      title: 'Whatsapp',
      type: 'string',
    },
  ],
};
