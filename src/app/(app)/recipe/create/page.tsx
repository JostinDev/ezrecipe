import Link from "next/link";
import Image from "next/image";
import chevron from "@/app/(app)/img/chevron_left.svg";
import PeopleCalculatorCreate from "./components/PeopleCalculatorCreate";
import { ingredientGroup, step } from "@/server/db/schema";
import CardIngredientCreate from "./components/CardIngredientCreate";
import CardStepCreate from "./components/CardStepCreate";
import add from "@/app/(app)/img/plus_button.svg";

export default async function Create() {
  return (
    <div className="max-w-[1200px] w-full mx-auto px-5">
      <button className="flex gap-1">
        <Image src={chevron} alt="logo" width={20} height={20} />
        <Link
          href="/"
          prefetch={true}
          className="text-title font-inter text-xl"
        >
          Back
        </Link>
      </button>
      <div className="text-center">
        <h1 className="text-[40px] font-ptSerif text-title">New recipe</h1>
        <p className="text-2xl font-inter text-body">Add folder</p>
      </div>

      <h2 className="text-[32px] font-ptSerif text-title pt-12">Ingredients</h2>

      <PeopleCalculatorCreate people={undefined} />

      <div className="pt-4 flex flex-wrap gap-10">
        {ingredientGroup ? <CardIngredientCreate /> : <CardIngredientCreate />}

        <div className="relative">
          <button className="flex flex-col gap-4 items-center border z-20 relative border-title rounded-lg p-5 bg-[url(/noisy-texture-200x200.png)] w-full bg-background bg-repeat bg-size-[200px_200px]">
            <p className="font-inter text-base font-bold text-title">
              Add a new ingredient group
            </p>
            <Image src={add} alt="logo" width={40} height={40} />
          </button>
          <div className="border z-10 absolute top-1 left-1 transition-all w-full h-full border-title rounded-[8px] p-3"></div>
        </div>
      </div>

      <h2 className="text-[32px] font-ptSerif text-title pt-12">Steps</h2>

      <div className="pt-4 flex flex-col gap-10">
        {step ? <CardStepCreate /> : <CardStepCreate />}
      </div>

      <div className="relative mt-10">
        <button className="flex border z-20 relative gap-4 items-center z-20 border-title rounded-lg p-5 bg-[url(/noisy-texture-200x200.png)] w-full bg-background bg-repeat bg-size-[200px_200px]">
          <Image src={add} alt="logo" width={40} height={40} />
          <p className="font-inter text-base font-bold text-title">
            Add a new Step
          </p>
        </button>
        <div className="border z-10 absolute top-1 left-1 transition-all w-full h-full border-title rounded-[8px] p-3"></div>
      </div>

      <button className="bg-pastelYellow mt-10 text-title rounded-xl px-8 py-4 font-inter font-bold border-2 border-title transition hover:drop-shadow-[4px_4px_0px]">
        Save
      </button>
    </div>
  );
}
