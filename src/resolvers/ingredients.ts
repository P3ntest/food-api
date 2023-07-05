import { Ingredient } from "@prisma/client";
import { IngredientResolvers } from "../generated/graphql";
import { db } from "../services/db";
import { fillNutritionalFacts, nutritionalFacts } from "../lib/nutrition";

export const ingredientsResolver = async () => {
  const ingredients = await db.ingredient.findMany();

  return ingredients.map(transformIngredient);
};

export const ingredientResolver = async (_: any, args: { id: string }) => {
  const ingredient = await db.ingredient.findUnique({
    where: { id: args.id },
  });

  if (!ingredient) {
    return null;
  }

  return transformIngredient(ingredient);
};

function transformIngredient(ingredient: Ingredient) {
  return {
    ...ingredient,
    nutrition: {
      ...fillNutritionalFacts(
        nutritionalFacts.parse(ingredient.nutritionalFacts)
      ),
      //   __typename: "Nutrition",
    },
  };
}
