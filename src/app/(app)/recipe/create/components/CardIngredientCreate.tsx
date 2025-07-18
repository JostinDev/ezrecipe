"use client";

import { Ingredient } from "@/server/db/schema";
import { Input, TextField } from "react-aria-components";
import IngredientRowCreate from "./IngredientRowCreate";
type CardIngredientCreateProps = {
  title?: string;
  ingredients?: Ingredient[];
};

export default function CardIngredientCreate({
  title,
  ingredients,
}: CardIngredientCreateProps) {
  return (
    <div className="flex flex-col bg-pastelBlue text-titleBlue rounded-lg p-5 max-w-[400px] w-full transition drop-shadow-[4px_4px_0px]">
      <TextField>
        <Input
          placeholder="Step instructions"
          disabled={false}
          className="h-10 rounded-md border font-bold bg-transparent border-dashed border-titleBlue p-2"
        />
      </TextField>

      <div className="flex mt-4 w-full flex-col gap-2">
        <IngredientRowCreate />
      </div>
    </div>
  );
}
