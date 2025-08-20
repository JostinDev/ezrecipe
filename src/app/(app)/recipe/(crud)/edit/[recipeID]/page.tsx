"use server";
import FormRecipe from "../../components/FormRecipeWrapper";

import { getRecipeById, getUserFolders } from "@/server/queries";

type RecipeProps = {
  params: Promise<{ recipeID: string }>;
};

export default async function Page({ params }: RecipeProps) {
  const folders = await getUserFolders();
  const param = await params;
  const recipeID = Number(param.recipeID);

  const recipe = await getRecipeById(recipeID);

  console.log(recipe);

  return <FormRecipe recipe={recipe} folders={folders} />;
}
