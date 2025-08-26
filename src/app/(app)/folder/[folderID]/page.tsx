import { getFolderWithRecipes } from "@/server/queries";
import Link from "next/link";

import CardRecipe from "@/app/(app)/component/CardRecipe";
import FolderOptions from "@/app/(app)/folder/[folderID]/component/FolderOptions";
import BackButton from "@/app/(app)/component/BackButton";

type FolderProps = {
  params: Promise<{ folderID: string }>;
};

export default async function Folder({ params }: FolderProps) {
  const param = await params;
  const folderID = Number(param.folderID);

  const recipes = await getFolderWithRecipes(folderID);

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <div>
        <div className="flex flex-col items-start sm:flex-row sm:items-center">
          <BackButton></BackButton>
          <div className="mt-4 flex w-full items-center justify-center sm:mt-0">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4">
                <h1 className="font-ptSerif text-[30px] text-title sm:text-[40px]">
                  {recipes?.name}
                </h1>
                <FolderOptions folderID={folderID} />
              </div>
            </div>
          </div>
        </div>

        <h2 className="pt-12 font-ptSerif text-[26px] text-title sm:text-[32px]">Recipes</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          {recipes?.recipes.map((recipe) => (
            <Link
              className="rounded-lg font-inter text-title"
              href={`/recipe/${recipe.id}`}
              key={recipe.id}
            >
              <CardRecipe recipeName={recipe.title} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
