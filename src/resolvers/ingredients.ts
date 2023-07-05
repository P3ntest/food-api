import { Ingredient as DBIngredient } from "@prisma/client";
import {
  Ingredient,
  IngredientResolvers,
  InputMaybe,
} from "../generated/graphql";
import { db } from "../services/db";
import { fillNutritionalFacts, nutritionalFacts } from "../lib/nutrition";
import { calculateNutritionalScores } from "../lib/nutrition/score";
import { transformIngredient } from "../lib/ingredients";

export const ingredientsResolver = async (
  _: any,
  args: { search?: InputMaybe<string> }
) => {
  const search = args.search?.toLowerCase() ?? "";

  const ingredients = await db.ingredient.findMany({
    where: {
      name: {
        mode: "insensitive",
        contains: search,
      },
    },
  });

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
