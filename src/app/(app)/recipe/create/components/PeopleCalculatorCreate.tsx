"use client";

import { useState } from "react";
import { Button, Input, TextField } from "react-aria-components";

type PeopleCalculatorCreateProps = {
  people?: number;
};

export default function PeopleCalculatorCreate({ people }: PeopleCalculatorCreateProps) {
  const [peopleNumber, setPeopleNumber] = useState(people || 1);

  function handlePeopleCounter(newValue: number) {
    if (newValue <= 0 || newValue > 10) {
      return;
    }
    setPeopleNumber(newValue);
  }

  return (
    <div className="mt-2 flex items-center gap-2">
      <p className="text-center font-inter text-base text-xl text-body">Recipe for</p>

      <Button
        onClick={() => handlePeopleCounter(peopleNumber - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-body p-4 font-inter text-2xl text-body"
      >
        -
      </Button>
      <TextField
        name="peopleNumber"
        className="w-5 text-center font-inter text-base text-xl text-body"
      >
        <Input className="w-5 bg-transparent text-center" readOnly value={peopleNumber}></Input>
      </TextField>

      <Button
        onClick={() => handlePeopleCounter(peopleNumber + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-body p-4 font-inter text-2xl text-body"
      >
        +
      </Button>
      <p className="text-center font-inter text-base text-xl text-body">people</p>
    </div>
  );
}
