"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import * as schema from "@/server/db/schema";

export async function getRecipes() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const recipes = await db.query.recipe.findMany({
    where: eq(schema.recipe.userID, userId),
    with: {
      folder: true,
    },
  });

  const recipesWithoutFolder: typeof recipes = [];
  const foldersMap: Map<string, { folderName: string; folderId: number; count: number }> =
    new Map();

  for (const recipe of recipes) {
    if (recipe.folder) {
      const folderId = recipe.folder.id;
      const folderName = recipe.folder.name;
      const folderKey = `${folderId}`;

      if (!foldersMap.has(folderKey)) {
        foldersMap.set(folderKey, {
          folderName,
          folderId,
          count: 0,
        });
      }

      foldersMap.get(folderKey)!.count += 1;
    } else {
      recipesWithoutFolder.push(recipe);
    }
  }

  const folders = Array.from(foldersMap.values());

  return { recipesWithoutFolder, folders };
}

export async function getRecipeById(recipeId: number) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const recipe = await db.query.recipe.findFirst({
    where: (fields, { eq, and }) => and(eq(fields.id, recipeId), eq(fields.userID, userId)),
    with: {
      folder: true,
      steps: true,
      ingredientGroups: {
        with: {
          ingredients: true,
        },
      },
    },
  });

  if (!recipe) {
    throw new Error("Recipe not found or unauthorized");
  }

  return recipe;
}

export async function getUserFolders() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return await db.query.folder.findMany({
    where: eq(schema.folder.userID, userId),
    columns: {
      id: true,
      name: true,
      userID: false,
    },
  });
}
