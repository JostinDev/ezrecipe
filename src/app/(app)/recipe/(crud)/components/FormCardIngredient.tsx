"use client";

import { Button, FieldError, Input, TextField } from "react-aria-components";
import IngredientRowCreate from "./IngredientRowCreate";
import Image from "next/image";
import cross from "@/app/(app)/img/cross.svg";
import add from "@/app/(app)/img/plus_button.svg";
import { useState } from "react";

import { IngredientGroup } from "@/app/(app)/types/types";

type GroupError = {
  title?: string;
  ingredients?: {
    amount?: string;
    ingredient?: string;
  }[];
};

type FormCardIngredientProps = {
  formError: Record<number, GroupError> | undefined;
  currentGroup?: IngredientGroup[];
};

// UI-only card model: uid for React, optional id for DB
type IngredientGroupCard = {
  uid: number; // local stable key
  id?: number; // DB id when editing existing group
  title: string;
};

export default function FormCardIngredient({ formError, currentGroup }: FormCardIngredientProps) {
  const initialGroupCards: IngredientGroupCard[] = currentGroup?.map((g, i) => ({
    uid: i, // local key 0..n-1
    id: g.id, // keep DB id
    title: g.title,
  })) ?? [{ uid: 0, title: "" }];

  const [uidCounter, setUidCounter] = useState(initialGroupCards.length);
  const [ingredientGroupCards, setIngredientGroupCards] =
    useState<IngredientGroupCard[]>(initialGroupCards);

  const updateIngredientGroupTitle = (uid: number, newTitle: string) => {
    setIngredientGroupCards((prev) =>
      prev.map((g) => (g.uid === uid ? { ...g, title: newTitle } : g)),
    );
  };

  const addIngredientGroupCard = () => {
    setIngredientGroupCards((prev) => [
      ...prev,
      { uid: uidCounter, title: "" }, // new group has no DB id yet
    ]);
    setUidCounter((c) => c + 1);
  };

  const removeIngredientGroupByUid = (uid: number) => {
    setIngredientGroupCards((prev) => prev.filter((g) => g.uid !== uid));
  };

  return (
    <div className="flex flex-col flex-wrap gap-5 pt-4 md:flex-row md:gap-10">
      {ingredientGroupCards.map((card, index) => (
        <div
          key={card.uid}
          className="relative flex w-full flex-col rounded-lg bg-pastelBlue p-5 text-titleBlue shadow-[4px_4px_0px_#263332] transition md:max-w-[400px]"
        >
          <TextField isRequired>
            <Input
              name={`ingredientGroup[${index}].title`}
              value={card.title}
              onChange={(e) => updateIngredientGroupTitle(card.uid, e.target.value)}
              placeholder="Ingredient group title"
              disabled={false}
              className="h-10 w-full rounded-md border border-dashed border-titleBlue bg-transparent p-2 font-bold"
            />
            <FieldError className="font-inter text-sm text-error" />
            <span className="font-inter text-sm text-error">{formError?.[index]?.title}</span>
          </TextField>

          <div className="mt-4 flex w-full flex-col gap-3">
            <IngredientRowCreate
              formError={formError?.[index].ingredients}
              ingredientGroup={index}
              currentIngredients={currentGroup?.[index]?.ingredients}
            />
          </div>
          <Button
            className="absolute -right-2 -top-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-title bg-background font-inter text-title"
            onClick={() => removeIngredientGroupByUid(card.uid)}
          >
            <Image src={cross} alt="logo" width={24} height={24} />
          </Button>
        </div>
      ))}

      <div className="relative flex max-h-[130px] w-full sm:w-auto">
        <Button
          type="button"
          onClick={() => addIngredientGroupCard()}
          className="bg-size-[200px_200px] relative z-20 flex w-full flex-col items-center gap-4 rounded-lg border border-title bg-background bg-[url(/noisy-texture-200x200.png)] bg-repeat p-5"
        >
          <p className="font-inter text-base font-bold text-title">Add an ingredient group</p>
          <Image src={add} alt="logo" width={40} height={40} />
        </Button>
        <div className="absolute left-1 top-1 z-10 h-full w-full rounded-[8px] border border-title p-3 transition-all"></div>
      </div>
    </div>
  );
}
