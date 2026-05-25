"use server";

import { CommunityFeedI } from "@/interfaces/communityfeed.interface";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";

export const CommunityFeedService = async () => {
  const cookieStore = await cookies();
  try {
    const res = await axios<{ feed: CommunityFeedI }>(
      `${process.env.API_URL}/community-feed`,
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        },
      },
    );
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
    if (error && isAxiosError(error)) {
      throw new Error(error.message);
    }
  }
};
