"use server";

import { DraftI } from "@/interfaces";
import axios, { isAxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const ContentDraftService = async () => {
  const cookieStore = await cookies();
  try {
    const res = await axios<Array<DraftI>>(`${process.env.API_URL}/drafts`, {
      headers: {
        Authorization: `Bearer ${cookieStore.get("token")?.value}`,
      },
    });

    const formatedDraft = res.data.map((draft) => ({
      id: draft.id,
      typeContent: draft.typeContent,
      content: draft.content,
      is_published: draft.is_published,
    }));

    revalidatePath("/dashboard");

    return formatedDraft;
  } catch (error) {
    if (error && isAxiosError(error)) {
      throw new Error(error.message);
    }
  }
};

export const GenerationDraftNew = async () => {
  const cookieStore = await cookies();
  try {
    await axios.post(
      `${process.env.API_URL}/generation/trigger`,
      {},
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        },
      },
    );
    revalidatePath("/dashboard");
    return {
      message: "Draft Generate",
    };
  } catch (error) {
    if (error && isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const RegenerateDraft = async ({ id }: { id: string }) => {
  const cookieStore = await cookies();

  try {
    const { data } = await axios.post<{ message: string }>(
      `${process.env.API_URL}/drafts/${id}/regenerate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        },
      },
    );

    return {
      message: data.message,
    };
  } catch (error) {
    if (error && isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
