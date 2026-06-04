"use server";

import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";

export interface ApprovedDraft {
  id: number;
  typeContent: "newsletter" | "twitter" | "bluesky";
  content: string;
  is_published: boolean;
  message_count: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch only approved drafts from backend
 */
export const GetApprovedDraftsService = async (): Promise<ApprovedDraft[]> => {
  const cookieStore = await cookies();

  try {
    const { data } = await axios.get<ApprovedDraft[]>(
      `${process.env.API_URL}/drafts?published=true`,
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Error fetching approved drafts:", error);

    if (error && isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error("Failed to fetch approved drafts");
  }
};