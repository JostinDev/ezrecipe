import { getRecipeById } from "@/server/queries";
import RecipeDisplayer from "../component/RecipeDisplayer";

type RecipeProps = {
  params: Promise<{ recipeID: string }>;
};

export default async function Recipe({ params }: RecipeProps) {
  const param = await params; //nextjs 15 makes storing await params mandatory
  const recipeID = Number(param.recipeID);

  const recipe = await getRecipeById(recipeID);

  return (
    <div className="max-w-[1200px] w-full mx-auto px-5">
      <div className="text-center">
        <h1 className="text-[40px] font-ptSerif text-title">{recipe.title}</h1>
        <p className="text-2xl font-inter text-body">
          {recipe.folder ? 'In "' + recipe.folder.name + '" folder' : ""}
        </p>
      </div>

      <RecipeDisplayer
        recipePeople={recipe.people}
        ingredientGroups={recipe.ingredientGroups}
        steps={recipe.steps}
      />
    </div>
  );
}
