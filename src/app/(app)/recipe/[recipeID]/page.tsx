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
    <div className="mx-auto w-full max-w-[1200px]">
      <div className="flex flex-col items-start sm:flex-row sm:items-center">
        <button className="flex items-center gap-1">
          <Image src={chevron} alt="logo" width={20} height={20} />
          <Link href="/" prefetch={true} className="font-inter text-lg text-title sm:text-xl">
            Back
          </Link>
        </button>
        <div className="mt-4 flex w-full items-center justify-center sm:mt-0">
          <div className="flex flex-col items-center">
            <div className="flex gap-4">
              <h1 className="pb-1 font-ptSerif text-[30px] text-title sm:text-[40px]">
                {recipe.title}
              </h1>
              <RecipeOptions shareToken={recipe.shareToken} recipeID={recipeID} />
            </div>
            <p className="font-inter text-2xl text-body">
              {recipe.folder ? 'In "' + recipe.folder.name + '" folder' : ""}
            </p>
          </div>
        </div>
      </div>

      <RecipeDisplayer
        recipePeople={recipe.people}
        ingredientGroups={recipe.ingredientGroups}
        steps={recipe.steps}
      />
    </div>
  );
}
