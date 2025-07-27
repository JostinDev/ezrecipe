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
          className="text-[40px] w-full max-w-[400px] rounded-lg font-ptSerif text-center text-title bg-transparent border border-dashed border-title p-2"
        ></Input>
        <FieldError />
        <p>{formError?.[0]}</p>
      </TextField>
    </div>
  );
}
