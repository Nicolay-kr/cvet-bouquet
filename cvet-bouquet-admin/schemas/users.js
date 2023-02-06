import { BsFillPeopleFill } from 'react-icons/bs'

export default {
  name: 'users',
  title: 'Пользователи',
  type: 'document',
  icon:BsFillPeopleFill,
  fields: [
    {
      title: 'Активный',
      name: 'active',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'name',
      title: 'Имя',
      type: 'string',
    },
    {
      title: 'Email уведомления',
      name: 'emailBlock',
      type: 'object',
      fields: [
        {
          name: 'emailAllow',
          title: 'Получать email уведомления',
          type: 'boolean',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
      ],
    },
    {
      title: 'Telegram уведомления',
      name: 'telegramBlock',
      type: 'object',
      fields: [
        {
          name: 'telegramAllow',
          title: 'Получать telegram уведомления',
          type: 'boolean',
        },
        {
          name: 'telegramName',
          title: 'Телеграм username',
          type: 'string',
        },
        {
          name: 'chatId',
          title: 'Чат id',
          type: 'string',
          readOnly: true,
        },
      ],
    },


  ],
  preview: {
    select: {
      name: 'name',
      active: 'active',
    },
    prepare: ({ name, emailBlock, active }) => {
      return {
        title: `${name} `,
        subtitle: `${active?'Активный':'Не Активный'}`,
      };
    },
  },
};
