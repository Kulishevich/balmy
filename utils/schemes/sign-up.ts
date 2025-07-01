import * as yup from "yup";

export const signUpSchema = yup.object({
  fullName: yup.string().required("Введите ФИО получателя"),
  phone: yup
    .string()
    .matches(/^(\+375|\+7)/, "Номер телефона должен начинаться с +375 или +7")
    .required("Введите номер телефона"),
  comment: yup.string().required("Введите комментарий"),
  "personal-info": yup.boolean().required(),
});
