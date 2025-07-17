"use client";

import { useState } from "react";

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

      <button
        onClick={() => handlePeopleCounter(peopleNumber - 1)}
        className="text-body flex text-2xl justify-center items-center font-inter rounded-full border border-body p-4 w-8 h-8"
      >
        -
      </button>
      <p className="text-body font-inter text-base text-xl w-5 text-center">
        {peopleNumber}
      </p>

      <button
        onClick={() => handlePeopleCounter(peopleNumber + 1)}
        className="text-body flex text-2xl justify-center items-center font-inter rounded-full border border-body p-4 w-8 h-8"
      >
        +
      </button>
      <p className="text-body font-inter text-base text-xl text-center">
        people
      </p>
    </div>
  );
}
