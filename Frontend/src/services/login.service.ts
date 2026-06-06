"use server";
import { LoginFormType } from "@/interfaces";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";

export const LoginService = async (values: LoginFormType) => {
  const cookieStore = await cookies();
  try {
    const { data } = await axios.post<{
      message: string;
      user: { id: number; full_name: string };
      token: string;
    }>(`${process.env.API_URL}/user/login`, values);
    cookieStore.set("token", data.token);
    return data.message;
  } catch (error) {
    if (error && isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
