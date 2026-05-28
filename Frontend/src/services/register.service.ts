"use server";

import { RegisterFormType } from "@/interfaces";
import axios, { isAxiosError } from "axios";

export const RegisterService = async (values: RegisterFormType) => {
  try {
    const { data } = await axios.post<{ message: string }>(
      `${process.env.API_URL}/user/register`,
      {
        full_name: values.fullName,
        email: values.email,
        password: values.password,
      },
    );
    return data.message;
  } catch (error) {
    if (error && isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
