"use server";

import { ApprovedDraft } from "@/interfaces";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";

export const GetApprovedDraftsService = async (): Promise<ApprovedDraft[]> => {
  const cookieStore = await cookies();

  try {
    const { data } = await axios.get<ApprovedDraft[]>(
      `${process.env.API_URL}/drafts?published=true`,
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        },
      },
    );

    return data;
  } catch (error) {
    if (error && isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error("Failed to fetch approved drafts");
  }
};
