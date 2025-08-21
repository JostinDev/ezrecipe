"use client";

import Link from "next/link";
import Image from "next/image";
import chevron from "@/app/(app)/img/chevron_left.svg";
import CardRecipe from "@/app/(app)/component/CardRecipe";
import FormSubmitButton from "@/app/(app)/recipe/(crud)/components/FormSubmitButton";
import { Checkbox, CheckboxGroup, FieldError, Form, Input, TextField } from "react-aria-components";
import { useActionState, useState } from "react";
import { createFolder, updateFolder } from "@/server/mutations";

type FormFolderWrapperProps = {
  recipesWithoutFolder: { id: number; title: string }[];
  folderTitle?: string;
  recipesInFolder?: { id: number; title: string }[];
  folderID?: number;
};

export default function FormFolderWrapper({
  recipesWithoutFolder,
  folderTitle,
  recipesInFolder,
  folderID,
}: FormFolderWrapperProps) {
  const [state, formAction, isPending] = useActionState(folderTitle ? updateFolder : createFolder, {
    errors: {},
  });

  const [title, setTitle] = useState(folderTitle ?? "");
  const defaultValues = recipesInFolder?.map((r) => r.id.toString());

  return (
    <Form
      action={formAction}
      className="mx-auto w-full max-w-[1200px] pb-10"
      validationErrors={state?.errors}
    >
      <input name="folderID" defaultValue={folderID} className="hidden" />
      <div className="mx-auto w-full max-w-[1200px]">
        <button className="mb-4 flex items-center gap-1">
          <Image src={chevron} alt="logo" width={20} height={20} />
          <Link href="/" prefetch={true} className="font-inter text-xl text-title">
            Back
          </Link>
        </button>

        <div className="text-center">
          <TextField isRequired name="folderName">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New recipe"
              className="w-full max-w-[400px] rounded-lg border border-dashed border-title bg-transparent p-2 text-center font-ptSerif text-[40px] text-title"
            ></Input>
            <div className="mt-2">
              <FieldError className="font-inter text-base text-error" />
            </div>
          </TextField>
        </div>

        <h2 className="pt-12 font-ptSerif text-[32px] text-title">Recipes without folder</h2>
        <p className="font-inter text-sm text-body">Select recipes to add in your new folder</p>

        <div className="pt-4">
          <CheckboxGroup
            defaultValue={defaultValues} // <-- use defaultValue, not defaultSelectedKeys
            name="recipes"
            className="flex flex-row flex-wrap gap-4"
          >
            {recipesInFolder?.map((recipe) => (
              <Checkbox
                isSelected={true}
                className="group"
                value={recipe.id.toString()}
                key={recipe.id}
              >
                <CardRecipe recipeName={recipe.title} />
              </Checkbox>
            ))}
            {recipesWithoutFolder.map((recipe) => (
              <Checkbox className="group" value={recipe.id.toString()} key={recipe.id}>
                <CardRecipe recipeName={recipe.title} />
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>

        <FormSubmitButton isFormPending={isPending} />
      </div>
    </Form>
  );
}
