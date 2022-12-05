// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import category from './category'
import categoryList from './categoryList'
import product from './product'
import bouquet from './bouquet'
import vendor from './vendor'
import clients from './clients'
import orders from './orders'
import productVariant from './productVariant'
import mainPage from './pages/mainPage'
import aboutusPage from './pages/aboutusPage'
import contactsPage from './pages/contactsPage'
import deliveryPage from './pages/deliveryPage'
import bonuscardPage from './pages/bonuscardPage'
import corporateclientsPage from './pages/corporateclientsPage'
import eposPage from './pages/eposPage'
import privacyPage from './pages/privacyPage'
import generalInfo from './generalInfo'
import deliveryGeneral from './deliveryGeneral'


import localeString from './locale/String'
import localeText from './locale/Text'
import localeBlockContent from './locale/BlockContent'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    category,
    categoryList,
    bouquet,
    clients,
    orders,
    mainPage,
    aboutusPage,
    contactsPage,
    deliveryPage,
    bonuscardPage,
    deliveryGeneral,
    eposPage,
    privacyPage,
    generalInfo,
    corporateclientsPage,
    // product,
    // vendor,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    localeText,
    localeBlockContent,
    localeString,
    productVariant,
  ]),
})
