"use client";

import CardStep from "./CardStep";
import CardIngredient from "./CardIngredient";
import PeopleCalculator from "./PeopleCalculator";
import { useState } from "react";
import { Ingredient, Step } from "@/server/db/schema";

type RecipeProps = {
  recipePeople: number;
  ingredientGroups: IngredientGroup[];
  steps: Step[];
};

type IngredientGroup = {
  id: number;
  title: string;
  recipeId: number;
  ingredients: Ingredient[];
};

export default function RecipeDisplayer({ recipePeople, ingredientGroups, steps }: RecipeProps) {
  const [peopleNumber, setPeopleNumber] = useState(recipePeople);

  return (
    <div>
      <h2 className="pt-12 font-ptSerif text-[26px] text-title sm:text-[32px]">Ingredients</h2>

      <PeopleCalculator onSetPeopleNumber={setPeopleNumber} people={peopleNumber} />

      <div className="flex flex-col flex-wrap gap-5 pt-4 md:flex-row md:gap-10">
        {ingredientGroups.map((ingredientGroup) => (
          <CardIngredient
            key={ingredientGroup.id}
            ingredientGroupTitle={ingredientGroup.title}
            ingredients={ingredientGroup.ingredients}
            peopleNumber={peopleNumber}
            basePeopleNumber={recipePeople}
          />
        ))}
      </div>

      <h2 className="pt-12 font-ptSerif text-[26px] text-title sm:text-[32px]">Steps</h2>

      <div className="flex flex-col gap-5 pt-4 md:gap-10">
        {steps.map((step, index) => (
          <CardStep key={step.id} stepDescription={step.description} stepIndex={index} />
        ))}
      </div>
    </div>
  );
}
