"use client";

import Image from "next/image";
import user from "@/app/(app)/img/user.svg";
import peopleMinus from "@/app/(app)/img/peopleMinus.svg";
import peoplePlus from "@/app/(app)/img/peoplePlus.svg";
import { Button } from "react-aria-components";

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
      <Button className="rounded-full" onClick={() => handlePeopleCounter(people - 1)}>
        <Image src={peopleMinus} width={32} height={32} alt={"removePeople"}></Image>
      </Button>
      <p className="w-5 text-center font-inter text-xl text-body">{people}</p>
      <Button className="rounded-full" onClick={() => handlePeopleCounter(people + 1)}>
        <Image src={peoplePlus} width={32} height={32} alt={"removePeople"}></Image>
      </Button>
    </div>
  );
}
