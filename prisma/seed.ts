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
    } satisfies NutritionalFacts,
  },
];

(async () => {
  await db.ingredient.deleteMany();
  await db.recipe.deleteMany();
  await db.packaging.deleteMany();

  await Promise.all(
    ingredients.map((ingredient) =>
      db.ingredient.create({ data: ingredient as any })
    )
  );
})();
