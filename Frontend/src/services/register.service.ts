"use server";

import { RegisterFormType } from "@/interfaces";
import axios, { isAxiosError } from "axios";

export const RegisterService = async (values: RegisterFormType) => {
  if (!process.env.API_URL) {
    return {
      ok: false,
      message: "API_URL is not configured",
    };
  }

  try {
    const { data } = await axios.post<{ message: string }>(
      `${process.env.API_URL}/user/register`,
      {
        full_name: values.fullName,
        email: values.email,
        password: values.password,
      },
    );
    return {
      ok: true,
      message: data.message,
    };
  } catch (error) {
    if (error && isAxiosError(error)) {
      return {
        ok: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Register request failed",
      };
    }

    return {
      ok: false,
      message: "Register request failed",
    };
  }
};
