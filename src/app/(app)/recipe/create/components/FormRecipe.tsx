"use client";

import PeopleCalculatorCreate from "./PeopleCalculatorCreate";
import CardIngredientCreate from "./CardIngredientCreate";
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
  const [state, formAction, isPending] = useActionState(createRecipe, {
    errors: {},
  });

  return (
    <Form
      action={formAction}
      className="max-w-[1200px] w-full mx-auto px-2 lg:px-5 pb-10"
    >
      <BackToHomeButton />
      <FormRecipeTitle formError={state.errors?.recipeName} />
      <FolderSelector folders={folders} />
      <h2 className="text-[32px] font-ptSerif text-title pt-12">Ingredients</h2>
      <PeopleCalculatorCreate people={undefined} />
      <CardIngredientCreate />
      <h2 className="text-[32px] font-ptSerif text-title pt-12">Steps</h2>
      <FormStep />
      <FormSubmitButton isFormPending={isPending} />
    </Form>
  );
}
