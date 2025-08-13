import { getRecipes } from "@/server/queries";
import CardFolder from "./component/CardFolder";
import CardRecipe from "./component/CardRecipe";
import Link from "next/link";
import add from "@/app/(app)/img/plus_button.svg";
import Image from "next/image";

export default async function Home() {
  const { recipesWithoutFolder, folders } = await getRecipes();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-5">
      <h2 className="font-ptSerif text-[32px] text-title">Folders</h2>
      <div className="flex flex-row flex-wrap items-center gap-4 pt-4">
        {folders.map((folder) => (
          <CardFolder key={folder.folderId} folderName={folder.folderName} count={folder.count} />
        ))}
        <div className="group relative">
          <button className="bg-size-[200px_200px] relative z-20 flex max-w-[200px] justify-between rounded-lg border border-title bg-background bg-[url(/noisy-texture-200x200.png)] bg-repeat p-3">
            <Link href="/folder/create" className="z-20 flex gap-2">
              <Image src={add} alt="logo" width={24} height={24} />
              <p className="font-inter text-base text-title">New folder</p>
            </Link>
          </button>
          <div className="absolute left-0 top-0 z-10 h-full w-full rounded-[8px] border border-title p-3 transition-all group-hover:left-1 group-hover:top-1"></div>
        </div>
      </div>

      <h2 className="pt-12 font-ptSerif text-[32px] text-title">Recipes</h2>
      <div className="flex flex-row flex-wrap gap-4 pt-4">
        {recipesWithoutFolder.map((recipe) => (
          <Link href={`/recipe/${recipe.id}`} prefetch={true} key={recipe.id}>
            <CardRecipe recipeName={recipe.title} />
          </Link>
        ))}
        <div className="group relative">
          <button className="bg-size-[200px_200px] relative z-20 flex max-w-[200px] justify-between rounded-lg border border-title bg-background bg-[url(/noisy-texture-200x200.png)] bg-repeat p-3">
            <Link href="/recipe/create" className="z-20 flex gap-2">
              <Image src={add} alt="logo" width={24} height={24} />
              <p className="font-inter text-base text-title">New recipe</p>
            </Link>
          </button>
          <div className="absolute left-0 top-0 z-10 h-full w-full rounded-[8px] border border-title p-3 transition-all group-hover:left-1 group-hover:top-1"></div>
        </div>
      </div>
    </div>
  );
}
