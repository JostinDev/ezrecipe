import { Button, FieldError, Input, TextField } from "react-aria-components";
import cross from "@/app/(app)/img/cross.svg";
import add from "@/app/(app)/img/plus_button.svg";
import Image from "next/image";
import { useState } from "react";

type CurrentSteps = {
  id: number;
  description: string;
  recipeId: number;
}[];

type FormStepsProps = {
  formError: string[] | undefined;
  currentSteps?: CurrentSteps;
};

type StepCard = {
  id?: number; // DB id (present for existing steps)
  description: string;
  uid: number; // local unique key for React (not the DB id)
};

export default function FormStep({ formError, currentSteps }: FormStepsProps) {
  const initialStepCards: StepCard[] = currentSteps?.map((s, i) => ({
    id: s.id, // keep DB id
    description: s.description,
    uid: i, // local key (0..n-1)
  })) ?? [{ id: undefined, description: "", uid: 0 }];

  const [uidCounter, setUidCounter] = useState(initialStepCards.length);
  const [stepCards, setStepCards] = useState<StepCard[]>(initialStepCards);

  const updateStepDescription = (index: number, newDescription: string) => {
    setStepCards((prev) =>
      prev.map((s, i) => (i === index ? { ...s, description: newDescription } : s)),
    );
  };

  const addStep = () => {
    setStepCards((prev) => [...prev, { id: undefined, description: "", uid: uidCounter }]);
    setUidCounter((c) => c + 1);
  };

  const removeStepByIndex = (index: number) => {
    setStepCards((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-col flex-wrap gap-5 pt-4 md:flex-row md:gap-10">
        {stepCards.map((card, index) => (
          <TextField
            isRequired
            key={card.uid}
            className="relative flex w-full flex-col rounded-lg bg-pastelBlue p-5 text-titleBlue shadow-[4px_4px_0px_#263332] transition"
          >
            {/* Hidden field tells the server this row maps to an existing DB row */}
            {card.id != null && <input type="hidden" name={`step[${index}].id`} value={card.id} />}
            <div className="flex w-full items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-titleBlue p-4 font-inter text-base font-bold text-titleBlue">
                {index + 1}
              </div>

              <Input
                name={`step[${index}].description`}
                value={card.description}
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

      <div className="relative mt-5 md:mt-10">
        <Button
          type="button"
          onClick={() => addStep()}
          className="bg-size-[200px_200px] relative z-20 flex w-full items-center gap-4 rounded-lg border border-title bg-background bg-[url(/noisy-texture-200x200.png)] bg-repeat p-5"
        >
          <Image src={add} alt="logo" width={40} height={40} />
          <p className="font-inter text-base font-bold text-title">Add a Step</p>
        </Button>
        <div className="absolute left-1 top-1 z-10 h-full w-full rounded-[8px] border border-title p-3 transition-all"></div>
      </div>
    </div>
  );
}
