import { FieldError, Input, TextField } from "react-aria-components";

type FormRecipeTitleProps = {
  formError: string[] | undefined;
};
export default function FormRecipeTitle({ formError }: FormRecipeTitleProps) {
  return (
    <div className="text-center">
      <TextField isRequired name="recipeName">
        <Input
          placeholder="New recipe"
          className="w-full max-w-[400px] rounded-lg border border-dashed border-title bg-transparent p-2 text-center font-ptSerif text-[40px] text-title"
        ></Input>
        <div className="mt-2">
          <FieldError className="font-inter text-base text-error" />
          <span className="font-inter text-base text-error">{formError?.[0]}</span>
        </div>
      </TextField>
    </div>
  );
}
