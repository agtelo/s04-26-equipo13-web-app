"use server";

import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";

export const ProfileService = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) return;
  try {
    const { data } = await axios(`${process.env.API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    if (error && isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
