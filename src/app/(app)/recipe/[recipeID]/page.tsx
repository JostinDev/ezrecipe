import { getRecipeById } from "@/server/queries";
import RecipeDisplayer from "../component/RecipeDisplayer";
import Link from "next/link";
import Image from "next/image";
import chevron from "@/app/(app)/img/chevron_left.svg";
import RecipeOptions from "@/app/(app)/recipe/[recipeID]/Component/RecipeOptions";

type RecipeProps = {
  params: Promise<{ recipeID: string }>;
};

export default async function Recipe({ params }: RecipeProps) {
  const param = await params; //nextjs 15 makes storing await params mandatory
  const recipeID = Number(param.recipeID);

  const recipe = await getRecipeById(recipeID);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-5">
      <button className="flex gap-1">
        <Image src={chevron} alt="logo" width={20} height={20} />
        <Link href="/" prefetch={true} className="font-inter text-xl text-title">
          Back
        </Link>
      </button>
      <div className="flex items-center justify-between">
        <div className="mx-auto self-center text-center">
          <h1 className="font-ptSerif text-[40px] text-title">{recipe.title}</h1>
          <p className="font-inter text-2xl text-body">
            {recipe.folder ? 'In "' + recipe.folder.name + '" folder' : ""}
          </p>
        </div>

        <RecipeOptions shareToken={recipe.shareToken} recipeID={recipeID} />
      </div>

      <RecipeDisplayer
        recipePeople={recipe.people}
        ingredientGroups={recipe.ingredientGroups}
        steps={recipe.steps}
      />
    </div>
  );
}
