import * as yup from "yup";

export const orderSchema = yup.object({
  fullName: yup.string().required("Введите ФИО получателя"),
  address: yup.string().required("Введите номер отделения или адрес"),
  phone: yup
    .string()
    .matches(/^(\+375|\+7)/, "Номер телефона должен начинаться с +375 или +7")
    .required("Введите номер телефона"),
  email: yup.string().email("Введите корректный адрес электронной почты"),
});
