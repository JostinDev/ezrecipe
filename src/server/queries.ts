"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { redirect } from "next/navigation";

export async function getRecipes() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  // fetch all recipes for the user
  const recipes = await db.query.recipe.findMany({
    where: eq(schema.recipe.userID, userId),
    with: {
      folder: true,
    },
  });

  // fetch all folders for the user (independent of recipes)
  const allFolders = await db.query.folder.findMany({
    where: eq(schema.folder.userID, userId),
  });

  const recipesWithoutFolder: typeof recipes = [];
  const foldersMap: Map<number, { folderName: string; folderId: number; count: number }> =
    new Map();

  // initialize all folders with count = 0
  for (const folder of allFolders) {
    foldersMap.set(folder.id, {
      folderName: folder.name,
      folderId: folder.id,
      count: 0,
    });
  }

  // count recipes into their folders
  for (const recipe of recipes) {
    if (recipe.folder) {
      const folderId = recipe.folder.id;
      foldersMap.get(folderId)!.count += 1;
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
export async function getRecipesWithoutFolder() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return await db.query.recipe.findMany({
    where: (r, { and, eq, isNull }) => and(eq(r.userID, userId), isNull(r.folderId)),
    columns: { id: true, title: true },
  });
}

export async function getFolderWithRecipes(folderId: number) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  // 1) Ensure the folder exists and is owned by the user
  const folder = await db.query.folder.findFirst({
    where: (tbl, { and, eq }) => and(eq(tbl.id, folderId), eq(tbl.userID, userId)),
    columns: { id: true, name: true },
  });

  if (!folder) return null;

  // 2) Fetch its recipes (also scoped to the same user, for safety)
  const recipes = await db.query.recipe.findMany({
    where: (r, { and, eq }) => and(eq(r.folderId, folderId), eq(r.userID, userId)),
    columns: { id: true, title: true, people: true },
  });

  return { ...folder, recipes };
}

export async function getRecipeByToken(token: string) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  // only select what you need
  const recipe = await db.query.recipe.findFirst({
    where: and(eq(schema.recipe.shareToken, token), eq(schema.recipe.userID, userId)),
    columns: {
      id: true,
      title: true,
      userID: true,
    },
  });

  if (!recipe) {
    redirect("/");
  }

  // look up the Clerk user to get the username
  const client = await clerkClient();
  const user = await client.users.getUser(recipe.userID);

  return {
    id: recipe.id,
    title: recipe.title,
    username: user.username ?? user.firstName ?? "Unknown",
  };
}

// Return the recipes that belong to a given folder for the current user
export async function getRecipesInFolder(folderId: number) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return await db.query.recipe.findMany({
    where: (r, { and, eq }) => and(eq(r.userID, userId), eq(r.folderId, folderId)),
    // pick what the page needs; add more columns if necessary
    columns: { id: true, title: true, people: true },
  });
}

// Return the folder title if the folder belongs to the current user
export async function getFolderTitle(folderId: number) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const folder = await db.query.folder.findFirst({
    where: (f, { and, eq }) => and(eq(f.id, folderId), eq(f.userID, userId)),
    columns: { name: true },
  });

  if (!folder) {
    // You can choose to redirect or throw:
    // redirect("/");
    throw new Error("Folder not found or unauthorized");
  }

  return folder.name;
}
