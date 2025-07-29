import { Button, FieldError, Input, TextField } from "react-aria-components";
import cross from "@/app/(app)/img/cross.svg";
import add from "@/app/(app)/img/plus_button.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

type FormStepsProps = {
  formError: string[] | undefined;
};

export default function FormStep({ formError }: FormStepsProps) {
  console.log(formError);
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
      prevSteps.map((step, i) =>
        i === index ? { ...step, description: newDescription } : step
      )
    );
  };

  useEffect(() => {
    console.log(stepCards);
  }, [stepCards]);

  const addStep = () => {
    const newStep: StepCard = {
      description: "",
      index: stepIndex,
    };
    setStepIndex(stepIndex + 1);
    setStepCards([...stepCards, newStep]);
  };

  const removeStepByIndex = (index: number) => {
    console.log("Index to remove", index);

    setStepCards((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(formError);
  }, [formError]);

  return (
    <div>
      <div className="pt-4 flex flex-col gap-10">
        {stepCards.map((stepCard, index) => (
          <TextField
            isRequired
            key={index}
            className="flex flex-col relative bg-pastelBlue text-titleBlue rounded-lg p-5 w-full transition drop-shadow-[4px_4px_0px]"
          >
            <div className="flex gap-4 items-center w-full">
              <div className="text-titleBlue flex justify-center items-center font-inter text-base font-bold rounded-full border border-titleBlue p-4 w-10 h-10">
                {index + 1}
              </div>

              <Input
                name={`step[${index}].description`}
                value={stepCard.description}
                onChange={(e) => updateStepDescription(index, e.target.value)}
                placeholder="Step instructions"
                disabled={false}
                className="h-10 w-full rounded-md bg-transparent border border-titleBlue border-dashed p-2"
              />
            </div>
            <Button
              type="button"
              className="flex items-center justify-center absolute -top-2 -right-2 w-[30px] h-[30px] font-inter bg-background border border-title text-title rounded-full"
              onClick={() => removeStepByIndex(index)}
            >
              <Image src={cross} alt="logo" width={24} height={24} />
            </Button>
            <div className="ml-[56px]">
              <FieldError className="font-inter text-sm text-error" />
              <span className="font-inter text-sm text-error">
                {formError?.[index]}
              </span>
            </div>
          </TextField>
        ))}
      </div>

      <div className="relative mt-10">
        <Button
          type="button"
          onClick={() => addStep()}
          className="flex border z-20 relative gap-4 items-center z-20 border-title rounded-lg p-5 bg-[url(/noisy-texture-200x200.png)] w-full bg-background bg-repeat bg-size-[200px_200px]"
        >
          <Image src={add} alt="logo" width={40} height={40} />
          <p className="font-inter text-base font-bold text-title">
            Add a new Step
          </p>
        </Button>
        <div className="border z-10 absolute top-1 left-1 transition-all w-full h-full border-title rounded-[8px] p-3"></div>
      </div>
    </div>
  );
}
