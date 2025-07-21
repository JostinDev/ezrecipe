"use client";

import { useState } from "react";
import {
  Button,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  TextField,
} from "react-aria-components";

import cross from "@/app/(app)/img/cross.svg";
import Image from "next/image";

type Unit =
  | "l"
  | "dl"
  | "cl"
  | "ml"
  | "kg"
  | "g"
  | "mg"
  | "tsp"
  | "tbsp"
  | "unit";

type IngredientRowProps = {
  amount: number;
  unit: Unit;
  ingredient: string;
  index: number;
  ingredientGroup: number;
  removeIngredientRow: (index: number) => void;
  addIngredientRow: () => void;
  updateIngredientAmout: (index: number, newAmount: number) => void;
  updateIngredientDescription: (index: number, ingredient: string) => void;
  updateIngredientUnit: (index: number, unit: Unit) => void;
};

export default function IngredientRowCreate({
  amount,
  unit,
  ingredient,
  ingredientGroup,
  index,
  removeIngredientRow,
  updateIngredientAmout,
  updateIngredientDescription,
  updateIngredientUnit,
}: IngredientRowProps) {
  const options = [
    { id: 1, name: "l" },
    { id: 2, name: "dl" },
    { id: 3, name: "cl" },
    { id: 4, name: "ml" },
    { id: 5, name: "kg" },
    { id: 6, name: "g" },
    { id: 7, name: "mg" },
    { id: 8, name: "tsp" },
    { id: 9, name: "tbsp" },
    { id: 10, name: "unit" },
  ];

  return (
    <div className="flex relative flex-row w-full gap-2 text-titleBlue font-inter text-base">
      <TextField
        name={`ingredientRow[${ingredientGroup}][${index}].amount`}
        className="max-w-20"
      >
        <Input
          onChange={(e) => updateIngredientAmout(index, Number(e.target.value))}
          inputMode="numeric"
          className="h-10 rounded-md border w-full bg-transparent border-dashed border-titleBlue p-2"
          placeholder="Amout"
        ></Input>
      </TextField>
      <TextField className="w-[70px]">
        <Select
          name={`ingredientRow[${ingredientGroup}][${index}].unit`}
          onSelectionChange={(value) => updateIngredientUnit(index, value)}
          placeholder="Unit"
          className="h-10 rounded-md w-full border bg-transparent border-dashed border-titleBlue"
        >
          <Button className="flex justify-between w-full p-2">
            <SelectValue />
            <span aria-hidden="true">▼</span>
          </Button>
          <Popover>
            <ListBox className="bg-background border border-title rounded-lg p-2">
              {options.map((option) => (
                <ListBoxItem
                  id={option.name}
                  className="cursor-pointer p-0.5 hover:font-bold data-[selected=true]:font-bold transition-all"
                  key={option.id}
                >
                  {option.name}
                </ListBoxItem>
              ))}
            </ListBox>
          </Popover>
        </Select>
      </TextField>
      <TextField
        name={`ingredientRow[${ingredientGroup}][${index}].ingredient`}
      >
        <Input
          onChange={(e) => updateIngredientDescription(index, e.target.value)}
          className="h-10 rounded-md border w-full bg-transparent border-dashed border-titleBlue p-2"
          placeholder="Ingredient"
        ></Input>
      </TextField>

      <Button
        className="flex items-center justify-center absolute -top-2 -right-2 w-[30px] h-[30px] font-inter bg-pastelBlue border border-titleBlue text-titleBlue rounded-full"
        onClick={() => removeIngredientRow(index)}
      >
        <Image src={cross} alt="logo" width={24} height={24} />
      </Button>
    </div>
  );
}
