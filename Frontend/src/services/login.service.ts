"use server";
import { LoginFormType } from "@/interfaces";
import axios from "axios";

export const LoginService = async (values: LoginFormType) => {
  try {
    const { data } = await axios.post<{
      message: string;
      user: { id: number; full_name: string };
      token: string;
    }>(`${process.env.API_URL}/user/login`, values);
    console.log(data);
    return data;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};
