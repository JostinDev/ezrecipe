import { getFolderTitle, getRecipesInFolder, getRecipesWithoutFolder } from "@/server/queries";
import FormFolderWrapper from "@/app/(app)/folder/components/FormFolderWrapper";

type FolderProps = {
  params: Promise<{ folderID: string }>;
};

export default async function Page({ params }: FolderProps) {
  const param = await params;
  const folderID = Number(param.folderID);

  const recipesWithoutFolder = await getRecipesWithoutFolder();
  const recipesInFolder = await getRecipesInFolder(folderID);
  const folderTitle = await getFolderTitle(folderID);

  return (
    <FormFolderWrapper
      folderID={folderID}
      folderTitle={folderTitle}
      recipesInFolder={recipesInFolder}
      recipesWithoutFolder={recipesWithoutFolder}
    />
  );
}
