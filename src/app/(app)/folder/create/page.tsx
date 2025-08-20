import { getRecipesWithoutFolder } from "@/server/queries";
import FormFolderWrapper from "@/app/(app)/folder/components/FormFolderWrapper";

export default async function Page() {
  const recipesWithoutFolder = await getRecipesWithoutFolder();

  return <FormFolderWrapper recipesWithoutFolder={recipesWithoutFolder} />;
}
