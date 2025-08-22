"use client";

import PeopleCalculatorCreate from "./PeopleCalculatorCreate";
import CardIngredientCreate from "./FormCardIngredient";
import { useActionState } from "react";
import { Form } from "react-aria-components";
import { createRecipe, updateRecipe } from "@/server/mutations";
import FolderSelector from "./FolderSelector";
import FormStep from "./FormStep";
import FormRecipeTitle from "./FormRecipeTitle";
import FormSubmitButton from "./FormSubmitButton";
import BackToHomeButton from "./BackToHomeButton";

import { RecipeData } from "@/app/(app)//types/types";
import { Folder } from "@/app/(app)//types/types";

type FormRecipeProps = {
  folders: Folder[];
  recipe?: RecipeData;
};

export default function FormRecipe({ folders, recipe }: FormRecipeProps) {
  // @ts-expect-error return type not compatible with expandable form. TODO: look into this
  const [state, formAction, isPending] = useActionState(recipe ? updateRecipe : createRecipe, {
    errors: {},
  });

  return (
    <Form action={formAction} className="mx-auto w-full max-w-[1200px]">
      <input className="hidden" name={"recipeId"} defaultValue={recipe?.id} />
      <BackToHomeButton />
      <FormRecipeTitle currentTitle={recipe?.title} formError={state.errors?.recipeName} />
      <FolderSelector currentFolderID={recipe?.folderId} folders={folders} />
      <h2 className="pt-12 font-ptSerif text-[26px] text-title sm:text-[32px]">Ingredients</h2>
      <PeopleCalculatorCreate currentPeople={recipe?.people} />
      <CardIngredientCreate
        currentGroup={recipe?.ingredientGroups}
        formError={state.errors?.ingredientGroups}
      />
      <h2 className="pt-12 font-ptSerif text-[26px] text-title sm:text-[32px]">Steps</h2>
      <FormStep currentSteps={recipe?.steps} formError={state.errors?.steps} />
      <FormSubmitButton isFormPending={isPending} />
    </Form>
  );
}
