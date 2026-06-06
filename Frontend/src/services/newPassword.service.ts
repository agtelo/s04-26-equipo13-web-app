"use server";

import { NewPasswordPayload } from "@/interfaces";
import axios, { isAxiosError } from "axios";

export const NewPasswordService = async ({ password, token }: NewPasswordPayload) => {
  try {
    const { data } = await axios.post<{ message: string }>(
      `${process.env.API_URL}/user/reset-password`,
      { token, newPassword: password },
    );

    return {
      message: data.message,
    };
  } catch (error) {
    if (error && isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
