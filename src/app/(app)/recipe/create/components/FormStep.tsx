import { Button, FieldError, Input, TextField } from "react-aria-components";
import cross from "@/app/(app)/img/cross.svg";
import add from "@/app/(app)/img/plus_button.svg";
import Image from "next/image";
import { useState } from "react";

type FormStepsProps = {
  formError: string[] | undefined;
};

export default function FormStep({ formError }: FormStepsProps) {
  type StepCard = {
    description: string;
    index: number;
  };

  const [stepIndex, setStepIndex] = useState(1);
  const [stepCards, setStepCards] = useState<StepCard[]>([
    {
      description: "",
      index: 0,
    },
  ]);

  const updateStepDescription = (index: number, newDescription: string) => {
    setStepCards((prevSteps) =>
      prevSteps.map((step, i) => (i === index ? { ...step, description: newDescription } : step)),
    );
  };

  const addStep = () => {
    const newStep: StepCard = {
      description: "",
      index: stepIndex,
    };
    setStepIndex(stepIndex + 1);
    setStepCards([...stepCards, newStep]);
  };

  const removeStepByIndex = (index: number) => {
    setStepCards((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-col gap-10 pt-4">
        {stepCards.map((stepCard, index) => (
          <TextField
            isRequired
            key={index}
            className="relative flex w-full flex-col rounded-lg bg-pastelBlue p-5 text-titleBlue drop-shadow-[4px_4px_0px] transition"
          >
            <div className="flex w-full items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-titleBlue p-4 font-inter text-base font-bold text-titleBlue">
                {index + 1}
              </div>

              <Input
                name={`step[${index}].description`}
                value={stepCard.description}
                onChange={(e) => updateStepDescription(index, e.target.value)}
                placeholder="Step instructions"
                disabled={false}
                className="h-10 w-full rounded-md border border-dashed border-titleBlue bg-transparent p-2"
              />
            </div>
            <Button
              type="button"
              className="absolute -right-2 -top-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-title bg-background font-inter text-title"
              onClick={() => removeStepByIndex(index)}
            >
              <Image src={cross} alt="logo" width={24} height={24} />
            </Button>
            <div className="ml-[56px]">
              <FieldError className="font-inter text-sm text-error" />
              <span className="font-inter text-sm text-error">{formError?.[index]}</span>
            </div>
          </TextField>
        ))}
      </div>

      <div className="relative mt-10">
        <Button
          type="button"
          onClick={() => addStep()}
          className="bg-size-[200px_200px] relative z-20 flex w-full items-center gap-4 rounded-lg border border-title bg-background bg-[url(/noisy-texture-200x200.png)] bg-repeat p-5"
        >
          <Image src={add} alt="logo" width={40} height={40} />
          <p className="font-inter text-base font-bold text-title">Add a new Step</p>
        </Button>
        <div className="absolute left-1 top-1 z-10 h-full w-full rounded-[8px] border border-title p-3 transition-all"></div>
      </div>
    </div>
  );
}
