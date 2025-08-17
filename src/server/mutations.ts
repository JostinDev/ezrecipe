"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { redirect } from "next/navigation";
import { and, eq, inArray, isNull } from "drizzle-orm";
import randomStringGenerator from "@/utils/randomStringGenerator";

const formSchema = z.object({
  recipeName: z.coerce
    .string()
    .min(1, "Recipe name is required")
    .max(256, "Recipe name is too long"),
  peopleNumber: z.coerce.number().min(1, "Must be at least 1 person"),
  selectedFolder: z.coerce
    .number()
    .int()
    .refine((val) => val > 0 || val === -1, {
      message: "Folder is required",
    }),
  steps: z
    .array(
      z.object({
        description: z.string().min(1, "Required").max(2000, "Too long"),
      }),
    )
    .min(1, "At least one step is required"),

  ingredientGroups: z
    .array(
      z.object({
        title: z.string().min(1, "Required").max(256, "Too long"),
        ingredients: z
          .array(
            z.object({
              amount: z.coerce
                .number("The field amount must be a number")
                .min(0.01, "The field amount is required"),
              unit: z.enum(["l", "dl", "cl", "ml", "kg", "g", "mg", "tsp", "tbsp", "unit"]),
              ingredient: z.string().min(1, "Required").max(256, "The ingredient is too long"),
            }),
          )
          .min(1, "At least one ingredient is required"),
      }),
    )
    .min(1, "At least one ingredient group is required"),
});

function parseFormData(formData: FormData) {
  const baseData = Object.fromEntries(formData.entries());

  const steps: { description: string }[] = [];
  const ingredientGroups: {
    title: string;
    ingredients: {
      amount: number;
      unit: string;
      ingredient: string;
    }[];
  }[] = [];

  // Parse steps
  for (const [key, value] of formData.entries()) {
    const match = key.match(/^step\[(\d+)\]\.description$/);
    if (match) {
      const index = parseInt(match[1]);
      steps[index] = { description: value as string };
    }
  }

  // Parse ingredient groups and rows
  const groupTitles: Record<number, string> = {};
  const groupRows: Record<
    number,
    {
      index: number;
      amount: number;
      unit: string;
      ingredient: string;
    }[]
  > = {};

  for (const [key, value] of formData.entries()) {
    const groupMatch = key.match(/^ingredientGroup\[(\d+)\]\.title$/);
    if (groupMatch) {
      groupTitles[+groupMatch[1]] = value as string;
    }

    const rowMatch = key.match(/^ingredientRow\[(\d+)\]\[(\d+)\]\.(amount|unit|ingredient)$/);
    if (rowMatch) {
      const groupIndex = +rowMatch[1];
      const rowIndex = +rowMatch[2];
      const field = rowMatch[3];

      groupRows[groupIndex] ||= [];
      groupRows[groupIndex][rowIndex] ||= {
        index: rowIndex,
        amount: 0,
        unit: "",
        ingredient: "",
      };

      if (field === "amount") {
        groupRows[groupIndex][rowIndex].amount = parseFloat(value as string);
      } else if (field === "unit") {
        groupRows[groupIndex][rowIndex].unit = value as string;
      } else if (field === "ingredient") {
        groupRows[groupIndex][rowIndex].ingredient = value as string;
      }
    }
  }

  for (const groupIndex in groupTitles) {
    ingredientGroups[+groupIndex] = {
      title: groupTitles[+groupIndex],
      ingredients: (groupRows[+groupIndex] || []).sort((a, b) => a.index - b.index),
    };
  }

  return {
    recipeName: baseData.recipeName,
    peopleNumber: baseData.peopleNumber,
    selectedFolder: baseData.selectedFolder,
    steps: steps.filter(Boolean), // remove undefined
    ingredientGroups: ingredientGroups.filter(Boolean),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createRecipe(prevState: any, formData: FormData) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  const parsed = parseFormData(formData);
  const validation = formSchema.safeParse(parsed);
  if (!validation.success) {
    type GroupErrorArray = {
      title?: string;
      ingredients?: {
        amount?: string;
        ingredient?: string;
      }[];
    };

    const formated = z.formatError(validation.error);

    let stepErrors: string[] = [];
    const titleError: string[] = [];
    const groupErrors: Record<number, GroupErrorArray> = {};

    // STEPS
    if (formated.steps) {
      const stepKeys = Object.keys(formated.steps).filter(
        (key): key is `${number}` => !isNaN(Number(key)),
      );
      const stepCount = stepKeys.length;

      stepErrors = Array(stepCount).fill("");

      for (const key of stepKeys) {
        stepErrors[key] = formated.steps[0].description?._errors[0] ?? "";
      }
    }

    // RECIPE NAME
    if (formated.recipeName) {
      titleError[0] = formated.recipeName?._errors[0];
    }

    if (formated.ingredientGroups) {
      const ingredientGroupKeys = Object.keys(formated.ingredientGroups).filter(
        (key): key is `${number}` => !isNaN(Number(key)),
      );

      for (const key of ingredientGroupKeys) {
        const idx = Number(key);
        const group = formated.ingredientGroups[idx];

        const ingredients = parsed.ingredientGroups?.[idx]?.ingredients;
        const ingredientsSize = ingredients
          ? Object.keys(ingredients).filter((k) => !isNaN(Number(k))).length
          : 0;

        const ingredientsArray = Array.from({ length: ingredientsSize }, () => ({
          amount: "",
          ingredient: "",
        }));

        const titleError = group?.title?._errors?.[0];

        if (group?.ingredients) {
          const ingredientKeys = Object.keys(group.ingredients).filter(
            (k): k is `${number}` => !isNaN(Number(k)),
          );

          if (ingredientKeys.length > 0) {
            ingredientKeys.forEach((key) => {
              const ing = group.ingredients?.[Number(key)];
              if (ing?.amount?._errors?.[0]) {
                ingredientsArray[key].amount = ing?.amount?._errors?.[0];
              }
              if (ing?.ingredient?._errors?.[0]) {
                ingredientsArray[key].ingredient = ing?.ingredient?._errors?.[0];
              }
            });
          }
        }

        groupErrors[idx] = {
          ...(titleError ? { title: titleError } : {}),
          ...(ingredientsArray ? { ingredients: ingredientsArray } : {}),
        };
      }
    }

    return {
      errors: {
        recipeName: titleError,
        peopleNumber: [""],
        selectedFolder: [""],
        steps: stepErrors,
        ingredientGroups: groupErrors,
      },
    };
  }

  // ---------- Validated data
  const { recipeName, peopleNumber, selectedFolder, steps, ingredientGroups } = validation.data;

  const recipeValues = {
    userID: userId,
    title: recipeName,
    people: peopleNumber,
    ...(selectedFolder !== -1 && { folderId: selectedFolder }),
    shareToken: randomStringGenerator(),
  };

  //Persist atomically
  const recipeID = await db.transaction(async (tx) => {
    // 1) Recipe
    const [newRecipe] = await tx.insert(schema.recipe).values(recipeValues).returning();
    const recipeId = newRecipe.id as number;

    // 2) Steps
    if (steps?.length) {
      await tx.insert(schema.step).values(
        steps.map((s: { description: string }) => ({
          recipeId,
          description: s.description,
        })),
      );
    }

    // 3) Groups + ingredients
    for (const group of ingredientGroups ?? []) {
      const [newGroup] = await tx
        .insert(schema.ingredientGroup)
        .values({ title: group.title, recipeId })
        .returning();

      if (group.ingredients?.length) {
        await tx.insert(schema.ingredient).values(
          group.ingredients.map((i) => ({
            quantity: String(i.amount ?? ""),
            unit: i.unit,
            description: i.ingredient,
            ingredientGroupId: newGroup.id,
          })),
        );
      }
    }

    return recipeId;
  });
  redirect(`/recipe/${recipeID}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createFolder(prevState: any, formData: FormData) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const formSchema = z.object({
    folderName: z.coerce
      .string()
      .min(1, "Recipe name is required")
      .max(256, "Recipe name is too long"),
  });

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const folderName = result.data.folderName;
  const recipeIds = formData
    .getAll("recipes")
    .map((v) => Number(v))
    .filter(Number.isFinite);

  const folderId = await db.transaction(async (tx) => {
    // 1) Insert folder
    const [newFolder] = await tx
      .insert(schema.folder)
      .values({ name: folderName, userID: userId })
      .returning({ id: schema.folder.id });

    const id = newFolder.id as number;

    // 2) If any recipe IDs were provided, validate ownership & unfiled state
    if (recipeIds.length > 0) {
      const validTargets = await tx
        .select({ id: schema.recipe.id })
        .from(schema.recipe)
        .where(
          and(
            inArray(schema.recipe.id, recipeIds),
            eq(schema.recipe.userID, userId),
            isNull(schema.recipe.folderId), // only attach unfiled; remove if you want to "move"
          ),
        );

      // If the provided IDs don't all match the criteria, abort (rollback)
      if (validTargets.length !== recipeIds.length) {
        throw new Error(
          "One or more recipes cannot be assigned (not yours or already in a folder).",
        );
      }

      // 3) Assign recipes to the new folder
      await tx
        .update(schema.recipe)
        .set({ folderId: id })
        .where(inArray(schema.recipe.id, recipeIds));
    }

    return id;
  });

  // Outside the txn: revalidate any lists/pages you show
  redirect(`/folder/${folderId}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteRecipe(prevState: any, formData: FormData) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const formSchema = z.object({
    recipeID: z.coerce.number(),
  });

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const recipeID = result.data.recipeID;

  await db
    .delete(schema.recipe)
    .where(and(eq(schema.recipe.id, recipeID), eq(schema.recipe.userID, userId)));

  redirect(`/`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveSharedRecipe(prevState: any, formData: FormData) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const formSchema = z.object({
    recipeID: z.coerce.number(),
  });

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const originalRecipeID = result.data.recipeID;

  let copiedRecipeID;

  await db.transaction(async (tx) => {
    // 1) Load original with all relations INSIDE the transaction
    const original = await tx.query.recipe.findFirst({
      where: eq(schema.recipe.id, originalRecipeID),
      with: {
        steps: true,
        ingredientGroups: {
          with: { ingredients: true },
        },
      },
    });

    if (!original) {
      throw new Error("Recipe not found");
    }

    // 2) Create the new recipe for the current user
    //    (omit shareToken so the DB default fills it; include if you generate in app)
    const [newRecipe] = await tx
      .insert(schema.recipe)
      .values({
        userID: userId,
        title: original.title,
        people: original.people,
        folderId: null,
        shareToken: randomStringGenerator(),
      })
      .returning();

    console.log(newRecipe);

    copiedRecipeID = newRecipe.id;

    console.log("NEW ID", copiedRecipeID);

    // 3) Copy steps
    if (original.steps.length > 0) {
      await tx.insert(schema.step).values(
        original.steps.map((s) => ({
          description: s.description,
          recipeId: newRecipe.id,
        })),
      );
    }

    // 4) Copy ingredient groups + ingredients
    for (const group of original.ingredientGroups) {
      const [newGroup] = await tx
        .insert(schema.ingredientGroup)
        .values({
          title: group.title,
          recipeId: newRecipe.id,
        })
        .returning();

      if (group.ingredients.length > 0) {
        await tx.insert(schema.ingredient).values(
          group.ingredients.map((i) => ({
            description: i.description,
            quantity: i.quantity, // numeric maps through as string/decimal as defined
            unit: i.unit,
            ingredientGroupId: newGroup.id,
          })),
        );
      }
    }
    // 5) Redirect to the new recipe page
  });
  redirect(`/recipe/${copiedRecipeID}`);
}
