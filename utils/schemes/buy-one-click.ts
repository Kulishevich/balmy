import * as yup from "yup";

export const buyOneClickSchema = yup.object({
  name: yup.string().required("Введите ваше имя"),
  phone: yup
    .string()
    .matches(
      /^\+7\d{10}$|^\+375\d{9}$|^\+7[()\s-]*\d{3}[()\s-]*\d{3}[()\s-]*\d{2}[()\s-]*\d{2}$|^\+375[()\s-]*\d{2}[()\s-]*\d{3}[()\s-]*\d{2}[()\s-]*\d{2}$/,
      "Неверный формат номера телефона"
    )
    .required("Введите номер телефона"),
  comment: yup.string(),
  "personal-info": yup.boolean().required(),
});
