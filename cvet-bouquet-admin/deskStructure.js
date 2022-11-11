import S from '@sanity/desk-tool/structure-builder';
import { IconContext } from 'react-icons/lib';
import { RiPagesLine } from 'react-icons/ri';

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
                .title('Главная страница')
                .child(
                  S.document().schemaType('mainPage').documentId('mainPage')
                ),
              S.listItem()
                .icon(RiPagesLine)
                .id('aboutuspage')
                .title('Страница о нас')
                .child(
                  S.document()
                    .schemaType('aboutusPage')
                    .documentId('aboutusPage')
                ),
            ])
        ),
      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(
        (listItem) => !['mainPage', 'aboutusPage'].includes(listItem.getId())
      ),
    ]);
