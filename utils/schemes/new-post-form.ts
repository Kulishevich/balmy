import * as yup from "yup";

export const newPotsFormScheme = yup.object({
  title: yup.string().required("Введите заголовок"),
});
