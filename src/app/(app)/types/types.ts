// Keep client types independent of server/db types to avoid module duplication issues.

export type Unit = "l" | "dl" | "cl" | "ml" | "kg" | "g" | "mg" | "tsp" | "tbsp" | "unit";

export type Ingredient = {
  id: number;
  quantity: string; // string in your DB
  unit: Unit;
  description: string;
  ingredientGroupId: number;
};

export type IngredientGroup = {
  id: number;
  title: string;
  recipeId: number;
  ingredients: Ingredient[];
};

export type Step = {
  id: number;
  description: string;
  recipeId: number;
};

export type Folder = {
  id: number;
  name: string;
};

export type RecipeData = {
  id: number;
  userID: string;
  title: string;
  people: number;
  folderId: number | null;
  shareToken: string;
  folder: {
    id: number;
    userID: string;
    name: string;
  } | null;
  steps: Step[];
  ingredientGroups: IngredientGroup[]; // <-- array of single-group type
};
