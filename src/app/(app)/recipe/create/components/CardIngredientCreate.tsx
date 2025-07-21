"use client";

import { Ingredient, IngredientGroup } from "@/server/db/schema";
import { Button, Input, TextField } from "react-aria-components";
import IngredientRowCreate from "./IngredientRowCreate";
import Image from "next/image";
import cross from "@/app/(app)/img/cross.svg";
import { useEffect, useState } from "react";
type CardIngredientCreateProps = {
  title?: string;
  ingredients?: Ingredient[];
  index: number;
  removeIngredientGroup: (index: number) => void;
  setTitle: (index: number, title: string) => void;
};

export default function CardIngredientCreate({
  title,
  ingredients,
  index,
  setTitle,
  removeIngredientGroup,
}: CardIngredientCreateProps) {
  type IngredientRow = {
    amount: number;
    unit: string;
    ingredient: string;
    index: number;
  };

  const [ingredientIndex, setIngredientIndex] = useState(1);
  const [ingredientRow, setIngredientRow] = useState<IngredientRow[]>([
    {
      amount: 0,
      unit: "unit",
      ingredient: "",
      index: 0,
    },
  ]);

  const updateIngredientAmout = (index: number, newAmount: number) => {
    setIngredientRow((prevAmounts) =>
      prevAmounts.map((amount, i) =>
        i === index ? { ...amount, amount: newAmount } : amount
      )
    );
  };

  const updateIngredientDescription = (index: number, ingredient: string) => {
    setIngredientRow((prevDescriptions) =>
      prevDescriptions.map((description, i) =>
        i === index ? { ...description, ingredient: ingredient } : description
      )
    );
  };

  const updateIngredientUnit = (index: number, unit: string) => {
    setIngredientRow((prevUnits) =>
      prevUnits.map((prevUnit, i) =>
        i === index ? { ...prevUnit, unit: unit } : prevUnit
      )
    );
  };

  useEffect(() => {
    console.log(ingredientRow);
  }, [ingredientRow]);

  const addIngredientRow = () => {
    const newIngredientRow: IngredientRow = {
      amount: 0,
      unit: "unit",
      ingredient: "",
      index: ingredientIndex,
    };
    setIngredientIndex(ingredientIndex + 1);
    setIngredientRow([...ingredientRow, newIngredientRow]);
  };

  const removeIngredientRowByIndex = (index: number) => {
    console.log("Index to remove", index);

    setIngredientRow((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col bg-pastelBlue text-titleBlue rounded-lg p-5 max-w-[400px] w-full transition drop-shadow-[4px_4px_0px]">
      <TextField>
        <Input
          name={`ingredientGroup[${index}].title`}
          value={title}
          onChange={(e) => setTitle(index, e.target.value)}
          placeholder="Ingredient group title"
          disabled={false}
          className="h-10 rounded-md border font-bold bg-transparent border-dashed border-titleBlue p-2"
        />
      </TextField>

      <div className="flex mt-4 w-full flex-col gap-3">
        {ingredientRow.map((row, rowIndex) => (
          <IngredientRowCreate
            key={row.index}
            amount={row.amount}
            unit={row.unit}
            ingredient={row.ingredient}
            index={rowIndex}
            ingredientGroup={index}
            removeIngredientRow={removeIngredientRowByIndex}
            updateIngredientAmout={updateIngredientAmout}
            updateIngredientDescription={updateIngredientDescription}
            updateIngredientUnit={updateIngredientUnit}
            addIngredientRow={addIngredientRow}
          />
        ))}
        <Button
          onClick={() => addIngredientRow()}
          className="h-10 rounded-md border w-full bg-transparent border-dashed border-titleBlue p-2"
        >
          <p className="font-inter text-base text-titleBlue">
            Add a new ingredient
          </p>
        </Button>
      </div>
      <Button
        className="flex items-center justify-center absolute -top-2 -right-2 w-[30px] h-[30px] font-inter bg-background border border-title text-title rounded-full"
        onClick={() => removeIngredientGroup(index)}
      >
        <Image src={cross} alt="logo" width={24} height={24} />
      </Button>
    </div>
  );
}
