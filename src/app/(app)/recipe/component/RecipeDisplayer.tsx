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

export default function RecipeDisplayer({
  recipePeople,
  ingredientGroups,
  steps,
}: RecipeProps) {
  const [peopleNumber, setPeopleNumber] = useState(recipePeople);

  return (
    <div>
      <h2 className="text-[32px] font-ptSerif text-title pt-12">Ingredients</h2>

      <PeopleCalculator
        onSetPeopleNumber={setPeopleNumber}
        people={peopleNumber}
      />

      <div className="pt-4 flex flex-wrap gap-10">
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

      <h2 className="text-[32px] font-ptSerif text-title pt-12">Steps</h2>

      <div className="pt-4 flex flex-col gap-10">
        {steps.map((step, index) => (
          <CardStep
            key={step.id}
            stepDescription={step.description}
            stepIndex={index}
          />
        ))}
      </div>
    </div>
  );
}
