"use client";

import Image from "next/image";
import user from "@/app/(app)/img/user.svg";

type PeopleCalculatorProps = {
  people: number;
  onSetPeopleNumber: (num: number) => void;
};

export default function PeopleCalculator({
  people,
  onSetPeopleNumber,
}: PeopleCalculatorProps) {
  function handlePeopleCounter(newValue: number) {
    if (newValue <= 0 || newValue > 10) {
      return;
    }
    onSetPeopleNumber(newValue);
  }

  return (
    <div className="flex gap-2 items-center mt-2">
      <Image src={user} alt="logo" width={24} height={24} />

      <button
        onClick={() => handlePeopleCounter(people - 1)}
        className="text-body flex text-2xl justify-center items-center font-inter rounded-full border border-body p-4 w-8 h-8"
      >
        -
      </button>
      <p className="text-body font-inter text-base text-xl w-5 text-center">
        {people}
      </p>

      <button
        onClick={() => handlePeopleCounter(people + 1)}
        className="text-body flex text-2xl justify-center items-center font-inter rounded-full border border-body p-4 w-8 h-8"
      >
        +
      </button>
    </div>
  );
}
