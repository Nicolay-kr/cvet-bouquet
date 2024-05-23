import * as yup from 'yup';

const createCheckoutSchema = (selfReceive, isPrivareHouse, isDelivery) => {
  const checkoutSchema = yup
    .object({
      name: yup.string().required('Это поле должно быть заполнено'),
      phone: yup.string().required('Это поле должно быть заполнено'),
      recipientName: selfReceive
        ? yup.mixed()
        : yup.string().required('Это поле должно быть заполнено'),
      recipientPhone: selfReceive
        ? yup.mixed()
        : yup.string().required('Это поле должно быть заполнено'),
      email: yup
        .string()
        .email('E-mail введен не корректно')
        .required('Это поле должно быть заполнено'),
      street: isDelivery
        ? yup.mixed()
        : yup.string().required('Это поле должно быть заполнено'),
      house: isDelivery
        ? yup.mixed()
        : yup.string().required('Это поле должно быть заполнено'),
      enter: yup.mixed(),
      comment: yup.mixed(),
      floor: yup.mixed(),
      flat:
        isPrivareHouse || isDelivery
          ? yup.mixed()
          : yup.string().required('Это поле должно быть заполнено'),
      // date: isDelivery
      //   ? yup.mixed()
      //   : yup.date().required('Это поле должно быть заполнено'),
      // time: isDelivery
      //   ? yup.mixed()
      //   : yup.date().required('Это поле должно быть заполнено'),
    })
    .required();

  return checkoutSchema;
};

export default createCheckoutSchema;
