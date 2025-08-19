import * as Yup from "yup";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const initialValues: LoginFormValues = { email: "", password: "" };

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string().required("Password is required").min(6, "Password altest 6 digit"),
});