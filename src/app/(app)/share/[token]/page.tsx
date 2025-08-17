import { getRecipeByToken } from "@/server/queries";
import SaveSharedRecipe from "@/app/(app)/share/[token]/SaveSharedRecipe";

type FolderProps = {
  params: Promise<{ token: string }>;
};

export default async function Share({ params }: FolderProps) {
  const param = await params;
  const token = param.token;

  const { id, title, username } = await getRecipeByToken(token);

  console.log(title);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-5">
      <h2 className="pt-12 font-ptSerif text-[32px] text-title">
        {username} is sharing the recipe {title} with you
      </h2>
      <p className="font-inter text-sm text-body">
        To add this recipe to your collection, click on save
      </p>
      <SaveSharedRecipe recipeID={id} />
    </div>
  );
}
