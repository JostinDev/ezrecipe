"use client";

import PeopleCalculatorCreate from "./PeopleCalculatorCreate";
import CardIngredientCreate from "./FormCardIngredient";
import { useActionState } from "react";
import { Form } from "react-aria-components";
import { createRecipe } from "@/server/mutations";
import FolderSelector from "./FolderSelector";
import FormStep from "./FormStep";
import FormRecipeTitle from "./FormRecipeTitle";
import FormSubmitButton from "./FormSubmitButton";
import BackToHomeButton from "./BackToHomeButton";

type Folder = {
  id: number;
  name: string;
};

type FormRecipeProps = {
  folders: Folder[];
};

export default function FormRecipe({ folders }: FormRecipeProps) {
  // @ts-expect-error return type not compatible with expandable form. TODO: look into this
  const [state, formAction, isPending] = useActionState(createRecipe, {
    errors: {},
  });

  return (
    <Form action={formAction} className="mx-auto w-full max-w-[1200px] px-2 pb-10 lg:px-5">
      <BackToHomeButton />
      <FormRecipeTitle formError={state.errors?.recipeName} />
      <FolderSelector folders={folders} />
      <h2 className="pt-12 font-ptSerif text-[32px] text-title">Ingredients</h2>
      <PeopleCalculatorCreate people={undefined} />
      <CardIngredientCreate formError={state.errors?.ingredientGroups} />
      <h2 className="pt-12 font-ptSerif text-[32px] text-title">Steps</h2>
      <FormStep formError={state.errors?.steps} />
      <FormSubmitButton isFormPending={isPending} />
    </Form>
  );
}
