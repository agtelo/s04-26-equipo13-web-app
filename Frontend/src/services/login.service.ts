import { LoginFormType } from "@/app/(auth)/login/components/login-form.type";
import axios from "axios";

export const LoginService = async (values: LoginFormType) => {
  const resp = await axios.post(`${process.env.API_URL}/user/login`, values);
  return resp;
};
