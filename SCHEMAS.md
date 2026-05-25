# Sanity CMS — Schema Documentation

> Auto-generated reference for the frontend app. All schemas live in `schemas/`.
> Languages: **ru** (default) · **en** (secondary).

---

## Table of Contents

- [Localization Types](#localization-types)
- [Shared Objects](#shared-objects)
- [Products](#products)
- [Categories](#categories)
- [Orders & Commerce](#orders--commerce)
- [Shop & Delivery](#shop--delivery)
- [Users](#users)
- [Pages](#pages)
- [General Info](#general-info)

---

## Localization Types

Used as field types throughout all schemas. Each produces a `{ ru, en }` object.

| Type | Sanity Name | Description |
|------|-------------|-------------|
| Single-line text | `localeString` | `{ ru: string, en: string }` |
| Multi-line text | `localeText` | `{ ru: text, en: text }` |
| Rich text (Portable Text) | `localeBlockContent` | `{ ru: block[], en: block[] }` |

**Supported languages:**
```js
[
  { id: 'ru', title: 'Русский', isDefault: true },
  { id: 'en', title: 'English' },
]
```

---

## Shared Objects

### `blockContent`

Rich text (Portable Text) array used inside `localeBlockContent`.

| Feature | Values |
|---------|--------|
| Block styles | `normal`, `h1`, `h2`, `h3`, `h4`, `blockquote` |
| List types | `bullet` |
| Inline marks | `strong`, `em` |
| Annotations | `link` → `{ href: string }` |
| Embeds | `image` (with hotspot) |

### `productVariant`

Reusable object embedded in the `product` document.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Variant name |
| `grams` | number | Weight in grams |
| `price` | number | Variant price |
| `sku` | string | Stock keeping unit |
| `taxable` | boolean | Tax applicability |
| `images` | image[] | With hotspot support |
| `barcode` | barcode | Custom barcode field |

---

## Products

### `bouquet`

> **File:** `schemas/bouquet.js`

| Field | Type | Notes |
|-------|------|-------|
| `published` | boolean | Toggle display on website |
| `title` | localeString | Multi-language name |
| `slug` | slug | URL identifier, auto-generated from `title.ru` |
| `price` | number | Price in BYN |
| `images` | image[] | With hotspot; first image used as cover |
| `description` | localeBlockContent | Rich text description |
| `care` | localeBlockContent | Care instructions |
| `delivery` | reference → `deliveryGeneral` | Linked delivery option |
| `publishedAt` | datetime | Auto-set on creation (read-only) |
| `order` | number | Hidden sort order |

**Frontend query example (GROQ):**
```groq
*[_type == "bouquet" && published == true] | order(order asc) {
  _id,
  title,
  slug,
  price,
  images,
  description,
  care,
  delivery->
}
```

---

### `product`

> **File:** `schemas/product.js`

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Product name |
| `slug` | slug | URL identifier |
| `defaultProductVariant` | productVariant | Default variant (object) |
| `variants` | productVariant[] | Additional variants |
| `tags` | string[] | Tag list |
| `vendor` | reference → `vendor` | Supplier reference |
| `blurb` | localeString | Short description |
| `categories` | reference[] → `category` | Linked categories |
| `body` | localeBlockContent | Full description |

---

## Categories

### `category`

> **File:** `schemas/category.js`

| Field | Type | Notes |
|-------|------|-------|
| `published` | boolean | Toggle display on website |
| `title` | string | Category name |
| `slug` | slug | URL identifier |
| `mainImage` | image | Category cover (with hotspot) |
| `bouqets` | reference[] → `bouquet` | Weak references to bouquets |

### `categoryList`

> **File:** `schemas/categoryList.js`

Singleton document — ordered list of categories for the homepage or navigation.

| Field | Type | Notes |
|-------|------|-------|
| `categories` | reference[] → `category` | Ordered category list |

---

## Orders & Commerce

### `orders`

> **File:** `schemas/orders.js` · Read-only document (created by the payment system).

| Field | Type | Notes |
|-------|------|-------|
| `OrderNumber` | string | Unique order ID (read-only) |
| `status` | string | Payment status |
| `billnumber` | string | Assist payment system bill number |
| `orderType` | string | Order type |
| `OrderAmount` | string | Total cost |
| `promocode` | string | Applied promo code |
| `paymentType` | string | Payment method |
| `name` | string | Customer name |
| `phone` | string | Customer phone |
| `email` | string | Customer email |
| `recipientName` | string | Recipient name |
| `recipientPhone` | string | Recipient phone |
| `orderlist` | text | Order composition (stringified) |
| `deliveryType` | string | `delivery` or `pickup` |
| `deliveryPlace` | string | Pickup location name |
| `comment` | text | Customer notes |
| `date` | string | Delivery date |
| `time` | string | Delivery time slot |
| `street` | string | Street address |
| `house` | string | Building number |
| `enter` | string | Entrance number |
| `floor` | string | Floor |
| `flat` | string | Apartment number |
| `registration` | datetime | Created at (read-only) |

### `promocode`

> **File:** `schemas/promocode.js`

| Field | Type | Notes |
|-------|------|-------|
| `active` | boolean | Whether the code is active |
| `title` | string | Display name |
| `code` | string | The actual code string |
| `percent` | number | Discount percentage (0–100) |

---

## Shop & Delivery

### `shops`

> **File:** `schemas/shops.js`

| Field | Type | Notes |
|-------|------|-------|
| `published` | boolean | Toggle display on website |
| `adress` | string | Street address |
| `time` | string | Working hours |
| `metro` | string | Nearest metro station |
| `location` | geopoint | GPS coordinates `{ lat, lng }` |

### `deliveryGeneral`

> **File:** `schemas/deliveryGeneral.js` · Referenced by `bouquet.delivery`.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Delivery option name |
| `delivery` | localeBlockContent | Description of the delivery option |

### `vendor`

> **File:** `schemas/vendor.js`

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Vendor / supplier name |
| `slug` | slug | URL identifier |
| `logo` | image | Vendor logo |
| `description` | blockContent | Rich text description |

---

## Users

### `users`

> **File:** `schemas/users.js` · CMS notification recipients.

| Field | Type | Notes |
|-------|------|-------|
| `active` | boolean | Account active status |
| `name` | string | User name |
| `emailBlock.emailAllow` | boolean | Enable email notifications |
| `emailBlock.email` | string | Email address |
| `telegramBlock.telegramAllow` | boolean | Enable Telegram notifications |
| `telegramBlock.telegramName` | string | Telegram username |
| `telegramBlock.chatId` | string | Telegram chat ID (read-only) |

---

## Pages

All page schemas are singletons (one document per type).

### `mainPage`

> **File:** `schemas/pages/mainPage.js`

| Field | Type | Notes |
|-------|------|-------|
| `title` | localeString | Page title |
| `firstBlock.published` | boolean | Show/hide block |
| `firstBlock.text` | localeBlockContent | Block text |
| `firstBlock.mainImage` | image | Primary image |
| `firstBlock.secondImage` | image | Secondary image |
| `secondBlock` | object | Same structure as `firstBlock` |
| `popularBouqets` | reference[] → `bouquet` | Featured bouquets |

---

### `aboutusPage`

> **File:** `schemas/pages/aboutusPage.js`

| Field | Type | Notes |
|-------|------|-------|
| `title` | localeString | Page title |
| `aboutusBlock.articles` | `{ title: localeString, text: localeBlockContent }[]` | Text sections |
| `aboutusBlock.mainImage` | image | Primary image |
| `aboutusBlock.secondImage` | image | Secondary image |

---

### `contactsPage`

> **File:** `schemas/pages/contactsPage.js`

| Field | Type | Notes |
|-------|------|-------|
| `title` | localeString | Page title |
| `subtitle` | string | Page subtitle |

---

### `deliveryPage`

> **File:** `schemas/pages/deliveryPage.js`

| Field | Type | Notes |
|-------|------|-------|
| `title` | localeString | Page title |
| `text1` | localeBlockContent | Delivery conditions |
| `text2` | localeBlockContent | Pickup from salon info |
| `mainImage` | image | |
| `secondImage` | image | |
| `conditions` | `{ published, title: localeString, desc: localeBlockContent }[]` | Payment method blocks |

---

### `bonuscardPage`

> **File:** `schemas/pages/bonuscardPage.js`

| Field | Type | Notes |
|-------|------|-------|
| `title` | localeString | Page title |
| `text1` | localeBlockContent | Discount system block |
| `text2` | localeBlockContent | Important information block |

---

### `corporateclientsPage`

> **File:** `schemas/pages/corporateclientsPage.js`

| Field | Type | Notes |
|-------|------|-------|
| `title` | localeString | Page title |
| `text` | localeBlockContent | Page content |
| `mainImage` | image | |
| `secondImage` | image | |
| `advantages` | `{ published, title: localeString, desc: localeBlockContent }[]` | Advantage blocks |

---

### `eposPage`

> **File:** `schemas/pages/eposPage.js` · ERIP / e-POS payment page.

| Field | Type | Notes |
|-------|------|-------|
| `title` | localeString | Page title |
| `text` | localeBlockContent | Page content |
| `link` | string | Payment URL |
| `code` | string | ERIP code |

---

### `privacyPage`

> **File:** `schemas/pages/privacyPage.js`

| Field | Type | Notes |
|-------|------|-------|
| `title` | localeString | Page title |
| `text` | localeBlockContent | Privacy policy content |

---

## General Info

### `generalInfo`

> **File:** `schemas/generalInfo.js` · Global site settings singleton.

| Field | Type | Notes |
|-------|------|-------|
| `phone` | string | Contact phone |
| `email` | string | Contact email |
| `shopsList` | shops[] | Embedded shop objects |
| `instagramBlock` | image[] | Up to 6 Instagram photos |
| `orgInfo` | localeBlockContent | Organisation info |
| `requisites` | string | Bank requisites |
| `deliveryPrice` | number | Delivery cost (BYN) |
| `deliveryMin` | number | Min order for free delivery (BYN) |
| `payments.paymentsOff` | boolean | Disable checkout globally |
| `payments.title` | string | Payments-off popup title |
| `payments.text` | text | Payments-off popup body |
| `instagram` | string | Instagram handle |
| `telegram` | string | Telegram handle |
| `viber` | string | Viber contact |
| `whatsapp` | string | WhatsApp contact |

---

## Schema Count Summary

| Category | Documents | Objects |
|----------|-----------|---------|
| Products | 2 (bouquet, product) | 1 (productVariant) |
| Categories | 2 | — |
| Orders & Commerce | 2 | — |
| Shop & Delivery | 3 | — |
| Users | 1 | — |
| Pages | 8 | — |
| General Info | 1 | — |
| Localization | — | 3 (localeString, localeText, localeBlockContent) |
| Shared Content | — | 1 (blockContent) |
| **Total** | **19** | **5** |
