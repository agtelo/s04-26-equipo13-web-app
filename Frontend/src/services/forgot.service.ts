"use server";

import axios, { isAxiosError } from "axios";

export const forgotPasswordService = async (email: string) => {
  try {
    const res = await axios.post(
      `${process.env.API_URL}/user/forgot-password`,
      {
        email,
      },
    );

    return {
      message: res.data.message,
    };
  } catch (error) {
    if (error && isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
