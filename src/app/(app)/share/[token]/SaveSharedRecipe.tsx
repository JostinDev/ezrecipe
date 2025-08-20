"use client";
import { Form } from "react-aria-components";
import FormSubmitButton from "@/app/(app)/recipe/(crud)/components/FormSubmitButton";
import { useActionState } from "react";
import { saveSharedRecipe } from "@/server/mutations";

type SaveSharedRecipeProps = {
  recipeID: number;
};

export default function SaveSharedRecipe({ recipeID }: SaveSharedRecipeProps) {
  const [state, formAction, isPending] = useActionState(saveSharedRecipe, {
    errors: {},
  });

  return (
    <Form action={formAction}>
      <input type="hidden" name="recipeID" defaultValue={recipeID} />
      <FormSubmitButton isFormPending={isPending} />
      <span className="hidden">{state?.errors.recipeID}</span>
    </Form>
  );
}
