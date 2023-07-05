import * as z from "zod";
import { Nutrition } from "../../generated/graphql";

export const nutritionalFacts = z.object({
  calories: z.number().optional(),

  fat: z.number().optional(),

  carbs: z.number().optional(),
  sugar: z.number().optional(),
  fibre: z.number().optional(),

  protein: z.number().optional(),

  sodium: z.number().optional(),
});

export type NutritionalFacts = z.infer<typeof nutritionalFacts> & Nutrition;

export function fillNutritionalFacts(
  nutritionalFacts: NutritionalFacts
): NutritionalFacts {
  if (!nutritionalFacts.calories) {
    if (
      nutritionalFacts.carbs &&
      nutritionalFacts.fat &&
      nutritionalFacts.protein
    ) {
      nutritionalFacts.calories =
        nutritionalFacts.carbs * 4 +
        nutritionalFacts.fat * 9 +
        nutritionalFacts.protein * 4;
    }
  }

  return nutritionalFacts;
}
