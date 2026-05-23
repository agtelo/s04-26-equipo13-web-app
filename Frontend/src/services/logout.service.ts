"use server";

import { cookies } from "next/headers";

export const LogoutService = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return "Signed out successfully"; 
};