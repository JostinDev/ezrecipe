import { Button } from "react-aria-components";

type FormSubmitButtonProps = {
  isFormPending: boolean;
};

export default function FormSubmitButton({ isFormPending }: FormSubmitButtonProps) {
  return (
    <Button
      isDisabled={isFormPending}
      type="submit"
      className={`mt-5 flex items-center gap-2 rounded-xl border-2 border-title bg-pastelYellow px-8 py-4 font-inter font-bold text-title transition md:mt-10 ${
        isFormPending
          ? "cursor-progress opacity-70 shadow-[4px_4px_0px_#12100c]"
          : "opacity-100 hover:shadow-[4px_4px_0px_#12100c]"
      }`}
    >
      {isFormPending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-transparent border-t-title"></div>
      ) : (
        ""
      )}
      Save
    </Button>
  );
}
