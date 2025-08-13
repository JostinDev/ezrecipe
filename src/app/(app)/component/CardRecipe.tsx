import Image from "next/image";
import chef from "../img/chef_blue.svg";

type CardRecipeProps = {
  recipeName: string;
};

export default function CardRecipe({ recipeName }: CardRecipeProps) {
  return (
    <div className="flex max-w-[200px] cursor-pointer justify-between rounded-lg border border-pastelBlue bg-pastelBlue p-3 text-titleBlue transition hover:drop-shadow-[4px_4px_0px]">
      <div className="flex gap-2">
        <Image src={chef} alt="logo" width={24} height={24} />
        <p className="font-inter text-base text-titleBlue">{recipeName}</p>
      </div>
    </div>
  );
}
