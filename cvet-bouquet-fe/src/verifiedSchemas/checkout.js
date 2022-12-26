import * as yup from 'yup';

const checkoutSchema = yup
.object({
  name: yup.string().required('Это поле должно быть заполнено'),
  phone: yup.string().required('Это поле должно быть заполнено'),
  customerSumma: yup
    .number()
    .required('Это поле должно быть заполнено')
    .typeError('Это поле должно быть в числовом формате. Пример: 2000'),
  email: yup
    .string()
    .email('E-mail введен не корректно')
    .required('Это поле должно быть заполнено'),
  street: yup.string().required('Это поле должно быть заполнено'),
  house: yup.string().required('Это поле должно быть заполнено'),
  flat: yup.string().required('Это поле должно быть заполнено'),
  // date: yup.string().required('Это поле должно быть заполнено'),
  // time: yup.string().required('Это поле должно быть заполнено'),
})
.required();

export default checkoutSchema;