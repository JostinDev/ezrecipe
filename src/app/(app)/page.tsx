import { getRecipes } from "@/server/queries";
import CardFolder from "./component/CardFolder";
import CardRecipe from "./component/CardRecipe";
import Link from "next/link";
import add from "@/app/(app)/img/plus_button.svg";
import Image from "next/image";

export default async function Home() {
  const { recipesWithoutFolder, folders } = await getRecipes();

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <h2 className="font-ptSerif text-[26px] text-title sm:text-[32px]">Folders</h2>
      <div className="flex flex-row flex-wrap items-center gap-4 pt-4">
        {folders.map((folder) => (
          <Link href={`/folder/${folder.folderId}`} prefetch={true} key={folder.folderId}>
            <CardFolder key={folder.folderId} folderName={folder.folderName} count={folder.count} />
          </Link>
        ))}
        <div className="group relative">
          <Link href="/folder/create">
            <button className="bg-size-[200px_200px] relative z-20 flex max-h-[50px] max-w-[200px] justify-between rounded-lg border border-title bg-background bg-[url(/noisy-texture-200x200.png)] bg-repeat p-3">
              <div className="z-20 flex gap-2">
                <Image src={add} alt="logo" width={24} height={24} />
                <p className="font-inter text-base text-title">New folder</p>
              </div>
            </button>
            <div className="absolute left-0 top-0 z-10 h-full max-h-[50px] w-full rounded-[8px] border border-title p-3 transition-all group-hover:left-1 group-hover:top-1"></div>
          </Link>
        </div>
      </div>

      <h2 className="pt-12 font-ptSerif text-[26px] sm:text-[32px]">Recipes</h2>
      <p className="font-inter text-sm text-body">Recipes without a folder</p>
      <div className="flex flex-row flex-wrap gap-4 pt-4">
        {recipesWithoutFolder.map((recipe) => (
          <Link href={`/recipe/${recipe.id}`} prefetch={true} key={recipe.id}>
            <CardRecipe recipeName={recipe.title} />
          </Link>
        ))}
        <div className="group relative">
          <Link href="/recipe/create">
            <button className="bg-size-[200px_200px] relative z-20 flex max-h-[50px] max-w-[200px] justify-between rounded-lg border border-title bg-background bg-[url(/noisy-texture-200x200.png)] bg-repeat p-3">
              <div className="z-20 flex gap-2">
                <Image src={add} alt="logo" width={24} height={24} />
                <p className="font-inter text-base text-title">New recipe</p>
              </div>
            </button>
            <div className="absolute left-0 top-0 z-10 h-full max-h-[50px] w-full rounded-[8px] border border-title p-3 transition-all group-hover:left-1 group-hover:top-1"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
