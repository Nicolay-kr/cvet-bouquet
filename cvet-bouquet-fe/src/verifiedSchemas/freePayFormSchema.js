import * as yup from 'yup';

const defaultSchema = yup
.object({
  name: yup.string().required('Это поле должно быть заполнено'),
  phone: yup.string().min(12,'Введите телефон').required('Это поле должно быть заполнено'),
  OrderAmount: yup
    .number()
    .required('Это поле должно быть заполнено')
    .typeError('Это поле должно быть в числовом формате. Пример: 2000'),
  email: yup.string().email('E-mail введен не корректно').required('Это поле должно быть заполнено'),
})
.required();

const contactSchema = yup
.object({
  name: yup.string().required('Это поле должно быть заполнено'),
  phone: yup.string().min(12,'Введите телефон').required('Это поле должно быть заполнено'),
  email: yup.string().email('E-mail введен не корректно').required('Это поле должно быть заполнено'),
})
.required();

// yup.setLocale({
//   number: {
//     typeError: 'Это поле должно быть в числовом формате',
//   },
// });

export {defaultSchema,contactSchema}