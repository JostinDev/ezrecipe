"use client";

import { Button, FieldError, Input, TextField } from "react-aria-components";
import IngredientRowCreate from "./IngredientRowCreate";
import Image from "next/image";
import cross from "@/app/(app)/img/cross.svg";
import add from "@/app/(app)/img/plus_button.svg";
import { useState } from "react";

type GroupError = {
  title?: string;
  ingredients?: {
    amount?: string;
    ingredient?: string;
  };
};

type FormCardIngredientProps = {
  formError: Record<number, GroupError> | undefined;
};

export default function FormCardIngredient({ formError }: FormCardIngredientProps) {
  type IngredientGroupCard = {
    title: string;
    index: number;
  };

  const [ingredientGroupIndex, setingredientGroupIndex] = useState(1);
  const [ingredientGroupCards, setIngredientGroupCards] = useState<IngredientGroupCard[]>([
    {
      title: "",
      index: 0,
    },
  ]);

  const updateIngredientGroupTitle = (index: number, newTitle: string) => {
    setIngredientGroupCards((prevIngredientGroup) =>
      prevIngredientGroup.map((ingredientGroup, i) =>
        i === index ? { ...ingredientGroup, title: newTitle } : ingredientGroup,
      ),
    );
  };

  const addIngredientGroupCard = () => {
    const newIngredientGroup: IngredientGroupCard = {
      title: "",
      index: ingredientGroupIndex,
    };
    setingredientGroupIndex(ingredientGroupIndex + 1);
    setIngredientGroupCards([...ingredientGroupCards, newIngredientGroup]);
  };

  const removeIngredientGroup = (index: number) => {
    setIngredientGroupCards((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap gap-10 pt-4">
      {ingredientGroupCards.map((ingredientGroupCard, index) => (
        <div
          key={ingredientGroupCard.index}
          className="relative flex w-full flex-col rounded-lg bg-pastelBlue p-5 text-titleBlue drop-shadow-[4px_4px_0px] transition sm:max-w-[400px]"
        >
          <TextField isRequired>
            <Input
              name={`ingredientGroup[${index}].title`}
              value={ingredientGroupCard.title}
              onChange={(e) => updateIngredientGroupTitle(index, e.target.value)}
              placeholder="Ingredient group title"
              disabled={false}
              className="h-10 w-full rounded-md border border-dashed border-titleBlue bg-transparent p-2 font-bold"
            />
            <FieldError className="font-inter text-sm text-error" />
            <span className="font-inter text-sm text-error">{formError?.[index]?.title}</span>
          </TextField>

          <div className="mt-4 flex w-full flex-col gap-3">
            <IngredientRowCreate
              formError={formError?.[index].ingredients}
              ingredientGroup={index}
            />
          </div>
          <Button
            className="absolute -right-2 -top-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-title bg-background font-inter text-title"
            onClick={() => removeIngredientGroup(index)}
          >
            <Image src={cross} alt="logo" width={24} height={24} />
          </Button>
        </div>
      ))}

      <div className="relative flex max-h-[130px] w-full sm:w-auto">
        <Button
          type="button"
          onClick={() => addIngredientGroupCard()}
          className="bg-size-[200px_200px] relative z-20 flex w-full flex-col items-center gap-4 rounded-lg border border-title bg-background bg-[url(/noisy-texture-200x200.png)] bg-repeat p-5"
        >
          <p className="font-inter text-base font-bold text-title">Add a new ingredient group</p>
          <Image src={add} alt="logo" width={40} height={40} />
        </Button>
        <div className="absolute left-1 top-1 z-10 h-full w-full rounded-[8px] border border-title p-3 transition-all"></div>
      </div>
    </div>
  );
}
