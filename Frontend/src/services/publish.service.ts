"use server";

import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

interface PublishPayload {
  id: string | number;
  content: string;
  typeContent: "bluesky" | "twitter" | "reddit" | "newsletter";
}

export const PublishDraftService = async (payload: PublishPayload) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("No authentication token found");

  const { id, content, typeContent } = payload;
  const headers = { Authorization: `Bearer ${token}` };

  try {
    let publishResult;

    // Publicar en la plataforma correspondiente
    if (typeContent === "bluesky") {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/publish/bluesky`,
        { content },
        { headers },
      );
      publishResult = data;
    } else if (typeContent === "newsletter") {
      // TODO: Implementar newsletter con Resend
      const { data } = await axios.post(
        `${process.env.API_URL}/api/publish/newsletter`,
        { content },
        { headers },
      );
      publishResult = data;
    } else if (typeContent === "reddit") {
      // TODO: Implementar blog con Reddit
    }

    // Marcar draft como aprobado en el backend
    await axios.put(
      `${process.env.API_URL}/drafts/${id}`,
      { is_published: true, content },
      { headers },
    );

    revalidatePath("/dashboard");

    return {
      success: true,
      id: String(id),
      content,
      message: `Draft published in ${typeContent} `,
      publishResult,
    };
  } catch (error) {
    if (error && isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message,
      );
    }
    throw error instanceof Error ? error : new Error("Publication failed");
  }
};

