import { Ingredient } from "@prisma/client";
import { db } from "../src/services/db";
import { NutritionalFacts } from "../src/lib/nutrition";

const ingredients: Partial<Ingredient>[] = [
  {
    name: "Egg",
    fluid: false,
    natural: true,
    nutritionalFacts: {
      protein: 12.2,
      fat: 9.9,
      carbs: 1.4,
      sugar: 1.1,
      fibre: 0,
    } satisfies NutritionalFacts,
  },
  {
    name: "Greek Yogurt",
    fluid: false,
    natural: true,
    nutritionalFacts: {
      protein: 19,
      fat: 5,
      carbs: 9,
      sugar: 9,
      fibre: 0.1,
    } satisfies NutritionalFacts,
  },
  {
    name: "Cashew Nuts",
    fluid: false,
    natural: true,
    nutritionalFacts: {
      protein: 19,
      fat: 44,
      carbs: 30,
      sugar: 6,
      fibre: 3.3,
    } satisfies NutritionalFacts,
  },
];

(async () => {
  await db.ingredient.deleteMany();
  await db.recipe.deleteMany();

  await Promise.all(
    ingredients.map((ingredient) =>
      db.ingredient.create({ data: ingredient as any })
    )
  );
})();
