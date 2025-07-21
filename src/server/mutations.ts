"use server";

import { z } from "zod";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";

export async function createRecipe(prevState: any, formData: FormData) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const schema = z.object({
    roomID: z.coerce.number(),
    milestoneID: z.coerce.number(),
  });

  console.log(formData);

  return;

  const formResult = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!formResult.success) {
    return { errors: formResult.error.flatten().fieldErrors };
  }
}
