import { FieldError, Input, TextField } from "react-aria-components";
import { useState } from "react";

type FormRecipeTitleProps = {
  formError: string[] | undefined;
  currentTitle?: string;
};
export default function FormRecipeTitle({ formError, currentTitle }: FormRecipeTitleProps) {
  const [title, setTitle] = useState(currentTitle ?? "");

  return (
    <div className="text-center">
      <TextField isRequired>
        <Input
          name="recipeName"
          value={title}
          placeholder="New recipe"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full max-w-[400px] rounded-lg border border-dashed border-title bg-transparent p-2 text-center font-ptSerif text-[30px] text-title sm:text-[40px]"
        ></Input>
        <div className="mt-2">
          <FieldError className="font-inter text-base text-error" />
          <span className="font-inter text-base text-error">{formError?.[0]}</span>
        </div>
      </TextField>
    </div>
  );
}
