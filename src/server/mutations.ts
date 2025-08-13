"use server";

import {z} from "zod";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/server/db";
import * as schema from "@/server/db/schema";
import {redirect} from 'next/navigation';


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
                            amount: z.coerce.number("Must be a number").min(0.01, "Required"),
                            unit: z.enum(["l", "dl", "cl", "ml", "kg", "g", "mg", "tsp", "tbsp", "unit"]),
                            ingredient: z.string().min(1, "Required").max(256, "Too long"),
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
        const match = key.match(/^step\[(\d+)\.description$/);
        if (match) {
            const index = parseInt(match[1]);
            steps[index] = {description: value as string};
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
        const groupMatch = key.match(/^ingredientGroup\[(\d+)\.title$/);
        if (groupMatch) {
            groupTitles[+groupMatch[1]] = value as string;
        }

        const rowMatch = key.match(/^ingredientRow\[(\d+)\[(\d+)\.(amount|unit|ingredient)$/);
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
    const {userId, redirectToSignIn} = await auth();
    if (!userId) return redirectToSignIn();
    const parsed = parseFormData(formData);
    const validation = formSchema.safeParse(parsed);
    if (!validation.success) {
        type GroupError = {
            title?: string;
            ingredients?: {
                amount?: string;
                ingredient?: string;
            }[];
        };

        const formated = z.formatError(validation.error);

        let stepErrors: string[] = [];
        const titleError: string[] = [];
        const groupErrors: Record<number, GroupError> = {};

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

                const ingredientsArray = Array.from({length: ingredientsSize}, () => ({
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
                            ingredientsArray[key].amount = ing?.amount?._errors?.[0];
                            ingredientsArray[key].ingredient = ing?.ingredient?._errors?.[0];
                        });
                    }
                }

                groupErrors[idx] = {
                    ...(titleError ? {title: titleError} : {}),
                    ...(ingredientsArray ? {ingredients: ingredientsArray} : {}),
                };
            }
        }
        console.log("GROUP ERROR:\n", JSON.stringify(groupErrors, null, 2));

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
    const {recipeName, peopleNumber, selectedFolder, steps, ingredientGroups} = validation.data;

    const recipeValues = {
        userID: userId,
        title: recipeName,
        people: peopleNumber,
        ...(selectedFolder !== -1 && {folderId: selectedFolder}),
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
                .values({title: group.title, recipeId})
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
