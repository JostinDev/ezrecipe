import { Button } from "react-aria-components";

type FormSubmitButtonProps = {
  isFormPending: boolean;
};

export default function FormSubmitButton({ isFormPending }: FormSubmitButtonProps) {
  return (
    <Button
      isDisabled={isFormPending}
      type="submit"
      className="mt-10 rounded-xl border-2 border-title bg-pastelYellow px-8 py-4 font-inter font-bold text-title transition hover:drop-shadow-[4px_4px_0px]"
    >
      Save
    </Button>
  );
}
