import { getRecipeById } from "@/server/queries";
import RecipeDisplayer from "../component/RecipeDisplayer";
import RecipeOptions from "@/app/(app)/recipe/[recipeID]/Component/RecipeOptions";
import BackButton from "@/app/(app)/component/BackButton";

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
        <BackButton></BackButton>
        <div className="mt-4 flex w-full items-center justify-center sm:mt-0">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
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
