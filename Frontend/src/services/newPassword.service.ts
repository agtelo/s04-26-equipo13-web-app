"use server";

import axios, { isAxiosError } from "axios";

interface Props {
  password: string;
  token: string;
}

export const NewPasswordService = async ({ password, token }: Props) => {
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
