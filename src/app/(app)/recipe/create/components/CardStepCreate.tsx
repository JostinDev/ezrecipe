import { Input, TextField } from "react-aria-components";

type CardStepCreateProps = {
  stepDescription?: string;
  stepIndex: number;
};

export default function CardStepCreate({
  stepDescription,
  stepIndex,
}: CardStepCreateProps) {
  return (
    <TextField className="flex bg-pastelBlue text-titleBlue rounded-lg p-5 w-full transition drop-shadow-[4px_4px_0px]">
      <div className="flex gap-4 items-center w-full">
        <div className="text-titleBlue flex justify-center items-center font-inter text-base font-bold rounded-full border border-titleBlue p-4 w-10 h-10">
          {stepIndex + 1}
        </div>
        <p className="font-inter text-base text-titleBlue">{stepDescription}</p>
        <Input
          placeholder="Step instructions"
          disabled={false}
          className="h-10 w-full rounded-md bg-transparent border border-titleBlue border-dashed p-2"
        />
      </div>
    </TextField>
  );
}
