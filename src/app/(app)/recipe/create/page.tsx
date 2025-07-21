"use client";

import Link from "next/link";
import Image from "next/image";
import chevron from "@/app/(app)/img/chevron_left.svg";
import PeopleCalculatorCreate from "./components/PeopleCalculatorCreate";
import CardIngredientCreate from "./components/CardIngredientCreate";
import add from "@/app/(app)/img/plus_button.svg";
import { useActionState, useEffect, useState } from "react";
import { Button, Form, Input, TextField } from "react-aria-components";
import cross from "@/app/(app)/img/cross.svg";
import { createRecipe } from "@/server/mutations";

export default function Create() {
  const [state, formAction, isPending] = useActionState(createRecipe, {
    errors: {},
  });

  type StepCard = {
    description: string;
    index: number;
  };

  type IngredientGroupCard = {
    title: string;
    index: number;
  };

  const [stepIndex, setStepIndex] = useState(1);
  const [stepCards, setStepCards] = useState<StepCard[]>([
    {
      description: "",
      index: 0,
    },
  ]);

  const [ingredientGroupIndex, setingredientGroupIndex] = useState(1);
  const [ingredientGroupCards, setIngredientGroupCards] = useState<
    IngredientGroupCard[]
  >([
    {
      title: "",
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

  const updateIngredientGroupTitle = (index: number, newTitle: string) => {
    setIngredientGroupCards((prevIngredientGroup) =>
      prevIngredientGroup.map((ingredientGroup, i) =>
        i === index ? { ...ingredientGroup, title: newTitle } : ingredientGroup
      )
    );
  };

  useEffect(() => {
    console.log(ingredientGroupCards);
    console.log(stepCards);
  }, [ingredientGroupCards, stepCards]);

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

  const addIngredientGroupCard = () => {
    const newIngredientGroup: IngredientGroupCard = {
      title: "",
      index: ingredientGroupIndex,
    };
    setingredientGroupIndex(ingredientGroupIndex + 1);
    setIngredientGroupCards([...ingredientGroupCards, newIngredientGroup]);
  };

  const removeIngredientGroupByIndex = (index: number) => {
    console.log("Index to remove", index);

    setIngredientGroupCards((prevSteps) =>
      prevSteps.filter((_, i) => i !== index)
    );
  };

  return (
    <Form action={formAction} className="max-w-[1200px] w-full mx-auto px-5">
      <Button type="button" className="flex gap-1">
        <Image src={chevron} alt="logo" width={20} height={20} />
        <Link
          href="/"
          prefetch={true}
          className="text-title font-inter text-xl"
        >
          Back
        </Link>
      </Button>
      <div className="text-center">
        <TextField name="recipeName">
          <Input
            placeholder="New recipe"
            className="text-[40px] rounded-lg font-ptSerif text-center text-title bg-transparent border border-dashed border-title p-2"
          ></Input>
        </TextField>
        <Button type="button" className="text-2xl font-inter text-body">
          Add folder
        </Button>
      </div>

      <h2 className="text-[32px] font-ptSerif text-title pt-12">Ingredients</h2>

      <PeopleCalculatorCreate people={undefined} />

      <div className="pt-4 flex flex-wrap gap-10">
        {ingredientGroupCards.map((ingredientGroupCard, index) => (
          <CardIngredientCreate
            removeIngredientGroup={removeIngredientGroupByIndex}
            key={index}
            index={index}
            title={ingredientGroupCard.title}
            setTitle={updateIngredientGroupTitle}
          />
        ))}

        <div className="relative flex max-h-[130px]">
          <Button
            type="button"
            onClick={() => addIngredientGroupCard()}
            className="flex flex-col gap-4 items-center border z-20 relative border-title rounded-lg p-5 bg-[url(/noisy-texture-200x200.png)] w-full bg-background bg-repeat bg-size-[200px_200px]"
          >
            <p className="font-inter text-base font-bold text-title">
              Add a new ingredient group
            </p>
            <Image src={add} alt="logo" width={40} height={40} />
          </Button>
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

      <Button
        type="submit"
        className="bg-pastelYellow mt-10 text-title rounded-xl px-8 py-4 font-inter font-bold border-2 border-title transition hover:drop-shadow-[4px_4px_0px]"
      >
        Save
      </Button>
    </Form>
  );
}
