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

type IngredientRowProps = {
  ingredientGroup: number;
  formError: { amount?: string; ingredient?: string }[] | undefined;
};

export default function IngredientRowCreate({ ingredientGroup, formError }: IngredientRowProps) {
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
      prevAmounts.map((amount, i) => (i === index ? { ...amount, amount: newAmount } : amount)),
    );
  };

  const updateIngredientDescription = (index: number, ingredient: string) => {
    setIngredientRow((prevDescriptions) =>
      prevDescriptions.map((description, i) =>
        i === index ? { ...description, ingredient: ingredient } : description,
      ),
    );
  };

  const updateIngredientUnit = (index: number, unit: string) => {
    setIngredientRow((prevUnits) =>
      prevUnits.map((prevUnit, i) => (i === index ? { ...prevUnit, unit: unit } : prevUnit)),
    );
  };

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
    setIngredientRow((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      {ingredientRow.map((row, index) => (
        <div key={row.index}>
          <div className="relative flex w-full flex-row gap-2 font-inter text-base text-titleBlue">
            <TextField
              isRequired
              name={`ingredientRow[${ingredientGroup}][${index}].amount`}
              className="w-[140px]"
            >
              <Input
                onChange={(e) => updateIngredientAmout(index, Number(e.target.value))}
                inputMode="numeric"
                className="h-10 w-full rounded-md border border-dashed border-titleBlue bg-transparent p-2"
                placeholder="Amount"
              ></Input>
            </TextField>
            <TextField className="w-[70px]">
              <Select
                defaultSelectedKey={"unit"}
                isRequired
                name={`ingredientRow[${ingredientGroup}][${index}].unit`}
                onSelectionChange={(value) => {
                  if (typeof value === "string") {
                    updateIngredientUnit(index, value);
                  }
                }}
                placeholder="Unit"
                className="h-10 w-[70px] rounded-md border border-dashed border-titleBlue bg-transparent"
              >
                <Button className="flex w-full justify-between p-2">
                  <SelectValue />
                  <span aria-hidden="true">▼</span>
                </Button>
                <Popover>
                  <ListBox className="rounded-lg border border-title bg-background p-2">
                    {options.map((option) => (
                      <ListBoxItem
                        id={option.name}
                        className="cursor-pointer p-0.5 transition-all hover:font-bold data-[selected=true]:font-bold"
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
              isRequired
              name={`ingredientRow[${ingredientGroup}][${index}].ingredient`}
              className="w-full"
            >
              <Input
                onChange={(e) => updateIngredientDescription(index, e.target.value)}
                className="h-10 w-full rounded-md border border-dashed border-titleBlue bg-transparent p-2"
                placeholder="Ingredient"
              ></Input>
            </TextField>

            <Button
              className="absolute -right-2 -top-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-titleBlue bg-pastelBlue font-inter text-titleBlue"
              onClick={() => removeIngredientRowByIndex(index)}
            >
              <Image src={cross} alt="logo" width={24} height={24} />
            </Button>
          </div>
          <div className="mt-1 flex flex-col">
            <span className="font-inter text-sm text-error">{formError?.[index].amount}</span>
            <span className="font-inter text-sm text-error">{formError?.[index].ingredient}</span>
          </div>
        </div>
      ))}

      <Button
        onClick={() => addIngredientRow()}
        className="h-10 w-full rounded-md border border-dashed border-titleBlue bg-transparent p-2"
      >
        <p className="font-inter text-base text-titleBlue">Add a new ingredient</p>
      </Button>
    </div>
  );
}
