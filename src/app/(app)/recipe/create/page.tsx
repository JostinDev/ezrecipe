"use server";
import FormRecipe from "./components/FormRecipe";

import { getUserFolders } from "@/server/queries";

export default async function Page() {
  const folders = await getUserFolders();
  return <FormRecipe folders={folders} />;
}
