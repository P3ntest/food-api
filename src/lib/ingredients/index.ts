import { Ingredient as QLIngredient } from "../../generated/graphql";
import { Ingredient as DBIngredient } from "@prisma/client";
import { fillNutritionalFacts, nutritionalFacts } from "../nutrition";
import { calculateNutritionalScores } from "../nutrition/score";

export function transformIngredient(ingredient: DBIngredient): QLIngredient {
  const nutrition = fillNutritionalFacts(
    nutritionalFacts.parse(ingredient.nutritionalFacts)
  );

  return {
    ...ingredient,
    nutrition,
    nutritionScore: calculateNutritionalScores(nutrition),
  };
}
