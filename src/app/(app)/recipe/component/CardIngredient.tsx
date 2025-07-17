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
    <div className="flex flex-col bg-pastelBlue text-titleBlue rounded-lg p-5 max-w-[300px] w-full transition drop-shadow-[4px_4px_0px]">
      <p className="font-inter text-base text-titleBlue font-bold mb-4 ">
        {ingredientGroupTitle}
      </p>
      <div className="flex flex-col gap-2">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex gap-2 items-center">
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
