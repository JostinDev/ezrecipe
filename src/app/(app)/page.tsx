import { getRecipes } from "@/server/queries";
import CardFolder from "./component/CardFolder";
import CardRecipe from "./component/CardRecipe";
import Link from "next/link";
import add from "@/app/(app)/img/plus_button.svg";
import Image from "next/image";

export default async function Home() {
  const { recipesWithoutFolder, folders } = await getRecipes();

  return (
    <div className="max-w-[1200px] w-full mx-auto px-5">
      <h2 className="text-[32px] font-ptSerif text-title">Folders</h2>
      <div className="pt-4 flex flex-wrap items-center flex-row gap-4">
        {folders.map((folder) => (
          <CardFolder
            key={folder.folderId}
            folderName={folder.folderName}
            count={folder.count}
          />
        ))}
        <div className="relative group">
          <button className="flex border z-20 relative border-title rounded-lg p-3 bg-[url(/noisy-texture-200x200.png)] bg-background bg-repeat bg-size-[200px_200px] justify-between max-w-[200px]">
            <Link href="folder/create" className="flex gap-2 z-20">
              <Image src={add} alt="logo" width={24} height={24} />
              <p className="font-inter text-base text-title">New folder</p>
            </Link>
          </button>
          <div className="border z-10 absolute top-0 left-0 transition-all group-hover:left-1 group-hover:top-1 w-full h-full border-title rounded-[8px] p-3"></div>
        </div>
      </div>

      <h2 className="text-[32px] font-ptSerif text-title pt-12">Recipes</h2>
      <div className="pt-4 flex flex-wrap flex-row gap-4">
        {recipesWithoutFolder.map((recipe) => (
          <Link href={`/recipe/${recipe.id}`} prefetch={true} key={recipe.id}>
            <CardRecipe recipeName={recipe.title} />
          </Link>
        ))}
        <div className="relative group">
          <button className="flex border z-20 relative border-title rounded-lg p-3 bg-[url(/noisy-texture-200x200.png)] bg-background bg-repeat bg-size-[200px_200px] justify-between max-w-[200px]">
            <Link href="recipe/create" className="flex gap-2 z-20">
              <Image src={add} alt="logo" width={24} height={24} />
              <p className="font-inter text-base text-title">New recipe</p>
            </Link>
          </button>
          <div className="border z-10 absolute top-0 left-0 transition-all group-hover:left-1 group-hover:top-1 w-full h-full border-title rounded-[8px] p-3"></div>
        </div>
      </div>
    </div>
  );
}
