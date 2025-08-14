import { getFolderWithRecipes } from "@/server/queries";
import Link from "next/link";
import Image from "next/image";
import chevron from "@/app/(app)/img/chevron_left.svg";

import CardRecipe from "@/app/(app)/component/CardRecipe";

type FolderProps = {
  params: Promise<{ folderID: string }>;
};

export default async function Folder({ params }: FolderProps) {
  const param = await params;
  const folderID = Number(param.folderID);

  const recipes = await getFolderWithRecipes(folderID);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-5">
      <button className="flex gap-1">
        <Image src={chevron} alt="logo" width={20} height={20} />
        <Link href="/" prefetch={true} className="font-inter text-xl text-title">
          Back
        </Link>
      </button>
      <div className="text-center">
        <h1 className="font-ptSerif text-[40px] text-title">{recipes?.name}</h1>
        <div className="mt-10 flex flex-wrap gap-4">
          {recipes?.recipes.map((recipe) => (
            <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
              <CardRecipe recipeName={recipe.title} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
