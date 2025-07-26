"use client";

import { useEffect, useState } from "react";
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
};

export default function IngredientRowCreate({
  ingredientGroup,
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

  useEffect(() => {
    console.log(ingredientRow);
  }, [ingredientRow]);

  const removeIngredientRowByIndex = (index: number) => {
    console.log("Index to remove", index);

    setIngredientRow((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      {ingredientRow.map((row, index) => (
        <div
          key={row.index}
          className="flex relative flex-row w-full gap-2 text-titleBlue font-inter text-base"
        >
          <TextField
            name={`ingredientRow[${ingredientGroup}][${index}].amount`}
            className="max-w-20"
          >
            <Input
              onChange={(e) =>
                updateIngredientAmout(index, Number(e.target.value))
              }
              inputMode="numeric"
              className="h-10 rounded-md border w-full bg-transparent border-dashed border-titleBlue p-2"
              placeholder="Amout"
            ></Input>
          </TextField>
          <TextField className="w-[70px]">
            <Select
              name={`ingredientRow[${ingredientGroup}][${index}].unit`}
              onSelectionChange={(value) => {
                if (typeof value === "string") {
                  updateIngredientUnit(index, value);
                }
              }}
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
              onChange={(e) =>
                updateIngredientDescription(index, e.target.value)
              }
              className="h-10 rounded-md border w-full bg-transparent border-dashed border-titleBlue p-2"
              placeholder="Ingredient"
            ></Input>
          </TextField>

          <Button
            className="flex items-center justify-center absolute -top-2 -right-2 w-[30px] h-[30px] font-inter bg-pastelBlue border border-titleBlue text-titleBlue rounded-full"
            onClick={() => removeIngredientRowByIndex(index)}
          >
            <Image src={cross} alt="logo" width={24} height={24} />
          </Button>
        </div>
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
  );
}
