"use client";

import { Button, Input, TextField } from "react-aria-components";
import IngredientRowCreate from "./IngredientRowCreate";
import Image from "next/image";
import cross from "@/app/(app)/img/cross.svg";
import add from "@/app/(app)/img/plus_button.svg";
import { useEffect, useState } from "react";

export default function CardIngredientCreate() {
  type IngredientGroupCard = {
    title: string;
    index: number;
  };

  const [ingredientGroupIndex, setingredientGroupIndex] = useState(1);
  const [ingredientGroupCards, setIngredientGroupCards] = useState<
    IngredientGroupCard[]
  >([
    {
      title: "",
      index: 0,
    },
  ]);

  const updateIngredientGroupTitle = (index: number, newTitle: string) => {
    setIngredientGroupCards((prevIngredientGroup) =>
      prevIngredientGroup.map((ingredientGroup, i) =>
        i === index ? { ...ingredientGroup, title: newTitle } : ingredientGroup
      )
    );
  };

  useEffect(() => {
    console.log(ingredientGroupCards);
  }, [ingredientGroupCards]);

  const addIngredientGroupCard = () => {
    const newIngredientGroup: IngredientGroupCard = {
      title: "",
      index: ingredientGroupIndex,
    };
    setingredientGroupIndex(ingredientGroupIndex + 1);
    setIngredientGroupCards([...ingredientGroupCards, newIngredientGroup]);
  };

  const removeIngredientGroup = (index: number) => {
    console.log("Index to remove", index);

    setIngredientGroupCards((prevSteps) =>
      prevSteps.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex gap-10 pt-4 flex-wrap">
      {ingredientGroupCards.map((ingredientGroupCard, index) => (
        <div
          key={ingredientGroupCard.index}
          className="flex flex-col bg-pastelBlue text-titleBlue rounded-lg p-5 max-w-[400px] w-full transition drop-shadow-[4px_4px_0px]"
        >
          <TextField>
            <Input
              name={`ingredientGroup[${index}].title`}
              value={ingredientGroupCard.title}
              onChange={(e) =>
                updateIngredientGroupTitle(index, e.target.value)
              }
              placeholder="Ingredient group title"
              disabled={false}
              className="h-10 rounded-md border font-bold bg-transparent border-dashed border-titleBlue p-2"
            />
          </TextField>

          <div className="flex mt-4 w-full flex-col gap-3">
            <IngredientRowCreate ingredientGroup={index} />
          </div>
          <Button
            className="flex items-center justify-center absolute -top-2 -right-2 w-[30px] h-[30px] font-inter bg-background border border-title text-title rounded-full"
            onClick={() => removeIngredientGroup(index)}
          >
            <Image src={cross} alt="logo" width={24} height={24} />
          </Button>
        </div>
      ))}

      <div className="relative flex max-h-[130px]">
        <Button
          type="button"
          onClick={() => addIngredientGroupCard()}
          className="flex flex-col gap-4 items-center border z-20 relative border-title rounded-lg p-5 bg-[url(/noisy-texture-200x200.png)] w-full bg-background bg-repeat bg-size-[200px_200px]"
        >
          <p className="font-inter text-base font-bold text-title">
            Add a new ingredient group
          </p>
          <Image src={add} alt="logo" width={40} height={40} />
        </Button>
        <div className="border z-10 absolute top-1 left-1 transition-all w-full h-full border-title rounded-[8px] p-3"></div>
      </div>
    </div>
  );
}
