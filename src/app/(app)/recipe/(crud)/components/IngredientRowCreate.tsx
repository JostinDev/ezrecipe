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
import { Ingredient } from "@/app/(app)/types/types";
import add from "@/app/(app)/img/plus_button_blue.svg";

type IngredientRowProps = {
  ingredientGroup: number;
  formError: { amount?: string; ingredient?: string }[] | undefined;
  currentIngredients?: Ingredient[];
};

// UI row state: uid = local key; id = DB id (optional)
type IngredientRow = {
  uid: number; // local stable key for React
  id?: number; // DB id if existing
  amount: number;
  unit: string;
  ingredient: string;
};

export default function IngredientRowCreate({
  ingredientGroup,
  formError,
  currentIngredients,
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

  console.log("currentIngredients", currentIngredients);

  const initialIngredientRows: IngredientRow[] = currentIngredients?.map((ing, i) => ({
    uid: i, // local key 0..n-1
    id: ing.id, // DB id (tells server to update)
    amount: Number(ing.quantity ?? 0),
    unit: ing.unit ?? "unit",
    ingredient: ing.description ?? "",
  })) ?? [{ uid: 0, amount: 0, unit: "unit", ingredient: "" }];

  console.log("initialIngredientRows", initialIngredientRows);

  const [uidCounter, setUidCounter] = useState(initialIngredientRows.length);
  const [ingredientRow, setIngredientRow] = useState<IngredientRow[]>(initialIngredientRows);

  const updateIngredientAmout = (index: number, newAmount: number) => {
    setIngredientRow((prev) =>
      prev.map((row, i) => (i === index ? { ...row, amount: newAmount } : row)),
    );
  };

  const updateIngredientDescription = (index: number, ingredient: string) => {
    setIngredientRow((prev) => prev.map((row, i) => (i === index ? { ...row, ingredient } : row)));
  };

  const updateIngredientUnit = (index: number, unit: string) => {
    setIngredientRow((prev) => prev.map((row, i) => (i === index ? { ...row, unit } : row)));
  };

  const addIngredientRow = () => {
    setIngredientRow((prev) => [
      ...prev,
      { uid: uidCounter, amount: 0, unit: "unit", ingredient: "" }, // no DB id => new
    ]);
    setUidCounter((c) => c + 1);
  };

  const removeIngredientRowByIndex = (index: number) => {
    setIngredientRow((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      {ingredientRow.map((row, index) => (
        <div key={row.uid}>
          {/* Hidden DB id for existing rows so server can diff update vs create */}
          {row.id != null && (
            <input
              type="hidden"
              name={`ingredientRow[${ingredientGroup}][${index}].id`}
              value={row.id}
            />
          )}
          <div className="relative flex w-full flex-row gap-2 font-inter text-base text-titleBlue">
            <TextField
              isRequired
              name={`ingredientRow[${ingredientGroup}][${index}].amount`}
              className="w-[140px]"
            >
              <Input
                value={row.amount}
                onChange={(e) => updateIngredientAmout(index, Number(e.target.value))}
                inputMode="numeric"
                className="h-10 w-full rounded-md border border-dashed border-titleBlue bg-transparent p-2"
                placeholder="Amount"
              />
            </TextField>
            <TextField className="w-[70px]">
              <Select
                defaultSelectedKey={"unit"}
                selectedKey={row.unit ? row.unit : "unit"}
                isRequired
                name={`ingredientRow[${ingredientGroup}][${index}].unit`}
                onSelectionChange={(value) => {
                  if (typeof value === "string") updateIngredientUnit(index, value);
                }}
                placeholder="Unit"
                className="h-10 w-[70px] rounded-md border border-dashed border-titleBlue bg-transparent"
              >
                <Button className="flex w-full justify-between rounded-md p-2">
                  <SelectValue />
                  <span aria-hidden="true">▼</span>
                </Button>
                <Popover className="w-full max-w-[70px] origin-top-left scale-100 opacity-100 transition-all duration-150 ease-in-out [&[data-entering]]:scale-95 [&[data-entering]]:opacity-100 [&[data-exiting]]:scale-95 [&[data-exiting]]:opacity-0">
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
                value={row.ingredient}
                onChange={(e) => updateIngredientDescription(index, e.target.value)}
                className="h-10 w-full rounded-md border border-dashed border-titleBlue bg-transparent p-2"
                placeholder="Ingredient"
              />
            </TextField>

            <Button
              className="absolute -right-2 -top-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-titleBlue bg-pastelBlue font-inter text-titleBlue"
              onClick={() => removeIngredientRowByIndex(index)}
            >
              <Image src={cross} alt="Remove ingredient" width={24} height={24} />
            </Button>
          </div>
          <div className="mt-1 flex flex-col">
            <span className="font-inter text-sm text-red-500">{formError?.[index]?.amount}</span>
            <span className="font-inter text-sm text-red-500">
              {formError?.[index]?.ingredient}
            </span>
          </div>
        </div>
      ))}

      <Button
        onClick={() => addIngredientRow()}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-titleBlue bg-transparent p-2"
      >
        <Image src={add} width={24} height={24} alt={"add ingredient"} />
        <p className="font-inter text-base text-titleBlue">Add an ingredient</p>
      </Button>
    </div>
  );
}
