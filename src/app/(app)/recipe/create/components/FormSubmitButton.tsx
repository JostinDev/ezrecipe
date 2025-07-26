import { Button } from "react-aria-components";

type FormSubmitButtonProps = {
  isFormPending: boolean;
};

export default function FormSubmitButton({
  isFormPending,
}: FormSubmitButtonProps) {
  return (
    <Button
      isDisabled={isFormPending}
      type="submit"
      className="bg-pastelYellow mt-10 text-title rounded-xl px-8 py-4 font-inter font-bold border-2 border-title transition hover:drop-shadow-[4px_4px_0px]"
    >
      Save
    </Button>
  );
}
