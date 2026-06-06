"use server";

import { Activity, CommunityFeedResponse } from "@/interfaces";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";

export const CommunityFeedService = async (): Promise<Activity[]> => {
  const cookieStore = await cookies();

  try {
    const res = await axios<CommunityFeedResponse[]>(
      `${process.env.API_URL}/community-feed`,
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        },
      },
    );

    return res.data.map((item, index) => ({
      id: `${index}`,
      author: item.user_name,
      source: item.channel_name,
      type: "post",
      content: item.content,
      reactions: item.reactions,
      replies: 0,
      timestamp: item.original_date,
    }));
  } catch (error) {
    if (error && isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error("Failed to fetch community feed");
  }
};

export const TriggerCollectionService = async () => {
  const cookieStore = await cookies();

  try {
    const { data } = await axios.post<{ message: string; messageCount: number }>(
      `${process.env.API_URL}/collection/trigger`,
      {},
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        },
      },
    );

    return {
      message: data.message,
      messageCount: data.messageCount,
    };
  } catch (error) {
    if (error && isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error("Failed to trigger collection");
  }
};
