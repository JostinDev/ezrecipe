import { getRecipeById } from "@/server/queries";
import CardStep from "../component/CardStep";
import CardIngredient from "../component/CardIngredient";

export default async function Recipe({
  params,
}: {
  params: { recipeID: string };
}) {
  const recipeID = Number(params.recipeID);

  const recipe = await getRecipeById(recipeID);

  return (
    <div className="max-w-[1200px] w-full mx-auto px-5">
      <div className="text-center">
        <h1 className="text-[40px] font-ptSerif text-title">{recipe.title}</h1>
        <p className="text-2xl font-inter text-body">
          {recipe.folder ? 'In "' + recipe.folder.name + '" folder' : ""}
        </p>
      </div>

      <h2 className="text-[32px] font-ptSerif text-title pt-12">Ingredients</h2>

      <div className="pt-4 flex flex-wrap gap-10">
        {recipe.ingredientGroups.map((ingredientGroup) => (
          <CardIngredient
            key={ingredientGroup.id}
            ingredientGroupTitle={ingredientGroup.title}
            ingredients={ingredientGroup.ingredients}
          />
        ))}
      </div>

      <h2 className="text-[32px] font-ptSerif text-title pt-12">Steps</h2>

      <div className="pt-4 flex flex-col gap-10">
        {recipe.steps.map((step, index) => (
          <CardStep
            key={step.id}
            stepDescription={step.description}
            stepIndex={index}
          />
        ))}
      </div>
    </div>
  );
}
