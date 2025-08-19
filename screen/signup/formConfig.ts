import * as Yup from "yup";

export interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

export const initialValues: SignupFormValues = {
  username: "",
  email: "",
  password: "",
};

export const SignupSchema = Yup.object().shape({
  username: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(4).required(),
});
