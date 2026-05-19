"use server";

import { cookies } from "next/headers";

export const LogoutService = async () => {
  const cookieStore = await cookies();

  return cookieStore.delete("token");
};
