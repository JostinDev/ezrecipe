"use client";

import { Ingredient } from "@/server/db/schema";
import IngredientRow from "./IngredientRow";
type CardIngredientProps = {
  ingredientGroupTitle: string;
  ingredients: Ingredient[];
  peopleNumber: number;
  basePeopleNumber: number;
};

export default function CardIngredient({
  ingredientGroupTitle,
  ingredients,
  peopleNumber,
  basePeopleNumber,
}: CardIngredientProps) {
  return (
    <div className="flex w-full max-w-[300px] flex-col rounded-lg bg-pastelBlue p-5 text-titleBlue shadow-[4px_4px_0px_#343638] transition">
      <p className="mb-4 font-inter text-base font-bold text-titleBlue">{ingredientGroupTitle}</p>
      <div className="flex flex-col gap-2">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex items-center gap-2">
            <IngredientRow
              amount={Number(ingredient.quantity)}
              unit={ingredient.unit}
              description={ingredient.description}
              basePeopleNumber={basePeopleNumber}
              peopleNumber={peopleNumber}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
