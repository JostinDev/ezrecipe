"use client";

import Image from "next/image";
import user from "@/app/(app)/img/user.svg";

type PeopleCalculatorProps = {
  people: number;
  onSetPeopleNumber: (num: number) => void;
};

export default function PeopleCalculator({ people, onSetPeopleNumber }: PeopleCalculatorProps) {
  function handlePeopleCounter(newValue: number) {
    if (newValue <= 0 || newValue > 10) {
      return;
    }
    onSetPeopleNumber(newValue);
  }

  return (
    <div className="mt-2 flex items-center gap-2">
      <Image src={user} alt="logo" width={24} height={24} />

      <button
        onClick={() => handlePeopleCounter(people - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-body p-4 font-inter text-2xl text-body"
      >
        -
      </button>
      <p className="w-5 text-center font-inter text-xl text-body">{people}</p>

      <button
        onClick={() => handlePeopleCounter(people + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-body p-4 font-inter text-2xl text-body"
      >
        +
      </button>
    </div>
  );
}
