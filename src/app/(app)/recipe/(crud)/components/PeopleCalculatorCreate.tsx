"use client";

import { useState } from "react";
import { Button, Input, TextField } from "react-aria-components";
import Image from "next/image";
import peoplePlus from "@/app/(app)/img/peoplePlus.svg";
import peopleMinus from "@/app/(app)/img/peopleMinus.svg";

type PeopleCalculatorCreateProps = {
  currentPeople?: number;
};

export default function PeopleCalculatorCreate({ currentPeople }: PeopleCalculatorCreateProps) {
  const [peopleNumber, setPeopleNumber] = useState(currentPeople || 1);

  function handlePeopleCounter(newValue: number) {
    if (newValue <= 0 || newValue > 10) {
      return;
    }
    setPeopleNumber(newValue);
  }

  return (
    <div className="mt-2 flex items-center gap-2">
      <p className="text-center font-inter text-xl text-body">Recipe for</p>

      <Button onClick={() => handlePeopleCounter(peopleNumber - 1)}>
        <Image src={peopleMinus} width={32} height={32} alt={"removePeople"}></Image>
      </Button>
      <TextField name="peopleNumber" className="w-5 text-center font-inter text-xl text-body">
        <Input className="w-5 bg-transparent text-center" readOnly value={peopleNumber}></Input>
      </TextField>

      <Button onClick={() => handlePeopleCounter(peopleNumber + 1)}>
        <Image src={peoplePlus} width={32} height={32} alt={"addPeople"}></Image>
      </Button>
      <p className="text-center font-inter text-xl text-body">people</p>
    </div>
  );
}
