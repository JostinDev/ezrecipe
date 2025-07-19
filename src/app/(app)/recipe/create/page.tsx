"use client";

import Link from "next/link";
import Image from "next/image";
import chevron from "@/app/(app)/img/chevron_left.svg";
import PeopleCalculatorCreate from "./components/PeopleCalculatorCreate";
import CardIngredientCreate from "./components/CardIngredientCreate";
import CardStepCreate from "./components/CardStepCreate";
import add from "@/app/(app)/img/plus_button.svg";
import { useEffect, useState } from "react";
import { step } from "@/server/db/schema";
import { Button, Input, TextField } from "react-aria-components";
import cross from "@/app/(app)/img/cross.svg";

export default function Create() {
  type StepCard = {
    description: string;
    index: number;
  };

  type IngredientGroupCard = {
    title: string;
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
    console.log("stepCards updated:", stepCards);
  }, [stepCards]);

  const [ingredientGroupCards, setIngredientGroupCards] = useState<
    IngredientGroupCard[]
  >([]);

  const addStep = () => {
    const newStep: StepCard = {
      description: "",
      index: stepIndex,
    };
    setStepIndex(stepIndex + 1);
    setStepCards([...stepCards, newStep]);
    console.log(stepCards);
  };

  const removeStepByIndex = (index: number) => {
    console.log("Index to remove", index);

    setStepCards((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  const addIngredientGroupCard = () => {
    const newIngredientGroup: IngredientGroupCard = {
      title: "",
    };
    setIngredientGroupCards([...ingredientGroupCards, newIngredientGroup]);
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto px-5">
      <button className="flex gap-1">
        <Image src={chevron} alt="logo" width={20} height={20} />
        <Link
          href="/"
          prefetch={true}
          className="text-title font-inter text-xl"
        >
          Back
        </Link>
      </button>
      <div className="text-center">
        <h1 className="text-[40px] font-ptSerif text-title">New recipe</h1>
        <p className="text-2xl font-inter text-body">Add folder</p>
      </div>

      <h2 className="text-[32px] font-ptSerif text-title pt-12">Ingredients</h2>

      <PeopleCalculatorCreate people={undefined} />

      <div className="pt-4 flex flex-wrap gap-10">
        <CardIngredientCreate title="" />
        {ingredientGroupCards.map((ingredientGroupCards, index) => (
          <CardIngredientCreate key={index} title={""} />
        ))}

        <div className="relative">
          <button
            onClick={() => addIngredientGroupCard()}
            className="flex flex-col gap-4 items-center border z-20 relative border-title rounded-lg p-5 bg-[url(/noisy-texture-200x200.png)] w-full bg-background bg-repeat bg-size-[200px_200px]"
          >
            <p className="font-inter text-base font-bold text-title">
              Add a new ingredient group
            </p>
            <Image src={add} alt="logo" width={40} height={40} />
          </button>
          <div className="border z-10 absolute top-1 left-1 transition-all w-full h-full border-title rounded-[8px] p-3"></div>
        </div>
      </div>

      <h2 className="text-[32px] font-ptSerif text-title pt-12">Steps</h2>

      <div className="pt-4 flex flex-col gap-10">
        {stepCards.map((stepCard, index) => (
          <TextField
            key={index}
            className="flex relative bg-pastelBlue text-titleBlue rounded-lg p-5 w-full transition drop-shadow-[4px_4px_0px]"
          >
            <div className="flex gap-4 items-center w-full">
              <div className="text-titleBlue flex justify-center items-center font-inter text-base font-bold rounded-full border border-titleBlue p-4 w-10 h-10">
                {index + 1}
              </div>

              <Input
                value={stepCard.description}
                onChange={(e) => updateStepDescription(index, e.target.value)}
                placeholder="Step instructions"
                disabled={false}
                className="h-10 w-full rounded-md bg-transparent border border-titleBlue border-dashed p-2"
              />
            </div>
            <Button
              className="flex items-center justify-center absolute -top-2 -right-2 w-[30px] h-[30px] font-inter bg-background border border-title text-title rounded-full"
              onClick={() => removeStepByIndex(index)}
            >
              <Image src={cross} alt="logo" width={24} height={24} />
            </Button>
          </TextField>
        ))}
      </div>

      <div className="relative mt-10">
        <button
          onClick={() => addStep()}
          className="flex border z-20 relative gap-4 items-center z-20 border-title rounded-lg p-5 bg-[url(/noisy-texture-200x200.png)] w-full bg-background bg-repeat bg-size-[200px_200px]"
        >
          <Image src={add} alt="logo" width={40} height={40} />
          <p className="font-inter text-base font-bold text-title">
            Add a new Step
          </p>
        </button>
        <div className="border z-10 absolute top-1 left-1 transition-all w-full h-full border-title rounded-[8px] p-3"></div>
      </div>

      <button className="bg-pastelYellow mt-10 text-title rounded-xl px-8 py-4 font-inter font-bold border-2 border-title transition hover:drop-shadow-[4px_4px_0px]">
        Save
      </button>
    </div>
  );
}
