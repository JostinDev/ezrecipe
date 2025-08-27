import Image from "next/image";
import chef from "../img/chef_blue.svg";
import chefChecked from "../img/chef_pink_checked.svg";

type CardRecipeProps = {
  recipeName: string;
};

export default function CardRecipe({ recipeName }: CardRecipeProps) {
  return (
    <div className="flex max-w-[250px] cursor-pointer justify-between rounded-lg border border-pastelBlue bg-pastelBlue p-3 text-titleBlue transition hover:shadow-[4px_4px_0px_#263332] group-data-[selected=true]:border-pastelPink group-data-[selected=true]:bg-pastelPink group-data-[selected=true]:shadow-[4px_4px_0px_#5a2c16]">
      <div className="flex gap-2">
        <Image
          className="group-data-[selected=true]:hidden"
          src={chef}
          alt="logo"
          width={24}
          height={24}
        />
        <Image
          className="hidden group-data-[selected=true]:block"
          src={chefChecked}
          alt="logo"
          width={24}
          height={24}
          priority
        />
        <p className="truncate font-inter text-base text-titleBlue group-data-[selected=true]:text-titlePink">
          {recipeName}
        </p>
      </div>
    </div>
  );
}
