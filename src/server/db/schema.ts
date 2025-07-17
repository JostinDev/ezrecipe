import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  varchar,
  pgEnum,
  serial,
  numeric,
} from "drizzle-orm/pg-core";

export const unitEnum = pgEnum("metric_system_units", [
  "l",
  "dl",
  "cl",
  "ml",
  "kg",
  "g",
  "mg",
  "tsp",
  "tbsp",
  "unit"
]);

/*********** FOLDER ***********/

export const folder = pgTable("folder", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 256 }).notNull(),
});

export type Folder = typeof folder.$inferSelect;

export const folderRelations = relations(folder, ({ many }) => ({
  recipes: many(recipe),
}));

/*********** RECIPE ***********/

export const recipe = pgTable("recipe", {
  id: serial("id").primaryKey(),
  userID: varchar("user_id", { length: 256 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  people: integer("people").notNull(),
  folderId: integer("folder_id").references(() => folder.id),
});

export type Recipe = typeof recipe.$inferSelect;

export const recipeRelations = relations(recipe, ({ one, many }) => ({
  folder: one(folder, {
    fields: [recipe.folderId],
    references: [folder.id],
  }),
  steps: many(step),
  ingredientGroups: many(ingredientGroup),
}));

/*********** STEP ***********/

export const step = pgTable("step", {
  id: serial("id").primaryKey(),
  description: varchar("description", { length: 2000 }).notNull(),
  recipeId: integer("recipe_id")
    .notNull()
    .references(() => recipe.id),
});

export type Step = typeof step.$inferSelect;

export const stepRelations = relations(step, ({ one }) => ({
  recipe: one(recipe, {
    fields: [step.recipeId],
    references: [recipe.id],
  }),
}));

/*********** INGREDIENT_GROUP ***********/

export const ingredientGroup = pgTable("ingredient_group", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  recipeId: integer("recipe_id")
    .notNull()
    .references(() => recipe.id),
});

export type IngredientGroup = typeof ingredientGroup.$inferSelect;

export const ingredientGroupRelations = relations(
  ingredientGroup,
  ({ one, many }) => ({
    ingredients: many(ingredient),
    recipe: one(recipe, {
      fields: [ingredientGroup.recipeId],
      references: [recipe.id],
    }),
  })
);

/*********** INGREDIENT ***********/

export const ingredient = pgTable("ingredient", {
  id: serial("id").primaryKey(),
  quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
  ingredientGroupId: integer("ingredient_group_id")
    .notNull()
    .references(() => ingredientGroup.id),
  unit: unitEnum("unit").notNull(),
  description: varchar("description", { length: 256 }).notNull(),
});

export type Ingredient = typeof ingredient.$inferSelect;

export const ingredientRelations = relations(ingredient, ({ one }) => ({
  ingredientGroup: one(ingredientGroup, {
    fields: [ingredient.ingredientGroupId],
    references: [ingredientGroup.id],
  }),
}));
