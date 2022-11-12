import S from '@sanity/desk-tool/structure-builder';
import { IconContext } from 'react-icons/lib';
import { RiPagesLine } from 'react-icons/ri';
import { AiFillSetting } from 'react-icons/ai';

export default () =>
  S.list()
    .id('content')
    .title('Контент')
    .items([
      S.listItem()
        .id('pagesList')
        .title('Страницы сайта')
        .child(
          S.list()
            // Sets a title for our new list
            .id('pages')
            .title('Страницы сайта')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .icon(RiPagesLine)
                .id('mainpage')
                .title('Главная')
                .child(
                  S.document()
                    .id('mainpage')
                    .title('Главная')
                    .schemaType('mainPage')
                    .documentId('mainPage')
                ),
              S.listItem()
                .icon(RiPagesLine)
                .id('aboutuspage')
                .title('О нас')
                .child(
                  S.document()
                    .id('aboutuspage')
                    .title('О нас')
                    .schemaType('aboutusPage')
                    .documentId('aboutusPage')
                ),
                S.listItem()
                .icon(RiPagesLine)
                .id('contactsPage')
                .title('Контакты')
                .child(
                  S.document()
                    .id('contactsPage')
                    .title('Контакты')
                    .schemaType('contactsPage')
                    .documentId('contactsPage')
                ),
                S.listItem()
                .icon(RiPagesLine)
                .id('deliveryPage')
                .title('Доставка и оплата')
                .child(
                  S.document()
                    .id('deliveryPage')
                    .title('Доставка и оплата')
                    .schemaType('deliveryPage')
                    .documentId('deliveryPage')
                ),
                S.listItem()
                .icon(RiPagesLine)
                .id('bonuscardPage')
                .title('Бонусная карта')
                .child(
                  S.document()
                    .id('bonuscardPage')
                    .title('Доставка и оплата')
                    .schemaType('bonuscardPage')
                    .documentId('bonuscardPage')
                ),
                S.listItem()
                .icon(RiPagesLine)
                .id('corporateclientsPage')
                .title('Корпоративным клиентам')
                .child(
                  S.document()
                    .id('corporateclientsPage')
                    .title('Доставка и оплата')
                    .schemaType('corporateclientsPage')
                    .documentId('corporateclientsPage')
                ),
                S.listItem()
                .icon(RiPagesLine)
                .id('eposPage')
                .title('E-POS оплата')
                .child(
                  S.document()
                    .id('eposPage')
                    .title('Доставка и оплата')
                    .schemaType('eposPage')
                    .documentId('eposPage')
                ),
            ])
        ),
      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['mainPage', 'aboutusPage', 'generalInfo','contactsPage','deliveryPage','bonuscardPage','corporateclientsPage','eposPage'].includes(listItem.getId())
      ),
      S.listItem()
        .icon(AiFillSetting)
        .id('generalInfo')
        .title('Общая информация')
        .child(
          S.document()
            .id('generalInfo')
            .title('Общая информация')
            .schemaType('generalInfo')
            .documentId('generalInfo')
        ),
    ]);
