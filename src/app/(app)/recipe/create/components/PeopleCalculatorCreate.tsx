"use client";

import { useState } from "react";
import { Button, Input, TextField } from "react-aria-components";

type PeopleCalculatorCreateProps = {
  people?: number;
};

export default function PeopleCalculatorCreate({
  people,
}: PeopleCalculatorCreateProps) {
  const [peopleNumber, setPeopleNumber] = useState(people || 1);

  function handlePeopleCounter(newValue: number) {
    if (newValue <= 0 || newValue > 10) {
      return;
    }
    setPeopleNumber(newValue);
  }

  return (
    <div className="flex gap-2 items-center mt-2">
      <p className="text-body font-inter text-base text-xl  text-center">
        Recipe for
      </p>

      <Button
        onClick={() => handlePeopleCounter(peopleNumber - 1)}
        className="text-body flex text-2xl justify-center items-center font-inter rounded-full border border-body p-4 w-8 h-8"
      >
        -
      </Button>
      <TextField
        name="peopleNumber"
        className="text-body font-inter text-base text-xl w-5 text-center"
      >
        <Input
          className="bg-transparent text-center w-5"
          readOnly
          value={peopleNumber}
        ></Input>
      </TextField>

      <Button
        onClick={() => handlePeopleCounter(peopleNumber + 1)}
        className="text-body flex text-2xl justify-center items-center font-inter rounded-full border border-body p-4 w-8 h-8"
      >
        +
      </Button>
      <p className="text-body font-inter text-base text-xl text-center">
        people
      </p>
    </div>
  );
}
