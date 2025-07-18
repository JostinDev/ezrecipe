"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  TextField,
} from "react-aria-components";

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

export default function IngredientRowCreate() {
  type IngredientRow = {
    amount: number;
    unit: Unit;
    description: number;
  };

  const [ingredients, setIngredients] = useState<IngredientRow[]>([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set());

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
    <div className="flex flex-row w-full gap-2 text-titleBlue font-inter text-base">
      <TextField className="max-w-20">
        <Input
          inputMode="numeric"
          className="h-10 rounded-md border w-full bg-transparent border-dashed border-titleBlue p-2"
          placeholder="Amout"
        ></Input>
      </TextField>
      <TextField className="w-[70px]">
        <Select
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
      <TextField className="">
        <Input
          className="h-10 rounded-md border w-full bg-transparent border-dashed border-titleBlue p-2"
          placeholder="Ingredient"
        ></Input>
      </TextField>
    </div>
  );
}
