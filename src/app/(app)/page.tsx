import { getRecipes } from "@/server/queries";
import CardFolder from "./component/CardFolder";
import CardRecipe from "./component/CardRecipe";

export default async function Home() {
  const { recipesWithoutFolder, folders } = await getRecipes();

  return (
    <div className="max-w-[1200px] w-full mx-auto px-5">
      <h2 className="text-[32px] font-ptSerif text-title">Folders</h2>
      <div className="pt-4">
        {folders.map((folder) => (
          <CardFolder
            key={folder.folderId}
            folderName={folder.folderName}
            folderId={folder.folderId}
            count={folder.count}
          />
        ))}
      </div>

      <h2 className="text-[32px] font-ptSerif text-title pt-12">Recipes</h2>
      <div className="pt-4">
        {recipesWithoutFolder.map((recipe) => (
          <CardRecipe
            key={recipe.id}
            recipeName={recipe.title}
            recipeId={recipe.id}
          />
        ))}
      </div>
    </div>
  );
}
