import { NutritionalFacts } from ".";
import {
  GlucoseImpact,
  KetoScore,
  NutritionScore,
} from "../../generated/graphql";

export function calculateNutritionalScores(
  nutrition: NutritionalFacts
): NutritionScore {
  return {
    ketoScore: calculateKetoScore(nutrition),
    glucoseImpact: calculateGlucoseImpact(nutrition),
  };
}

function calculateGlucoseImpact({
  carbs,
  fibre,
  sugar,
  protein,
  fat,
}: NutritionalFacts): GlucoseImpact {
  if (!carbs) {
    return GlucoseImpact.Unknown;
  }

  fibre = fibre ?? 0;
  sugar = sugar ?? 0;
  protein = protein ?? 0;
  fat = fat ?? 0;

  const impact = carbs + sugar * 3 - fibre * 5 - protein * 0.2 - fat * 0.6;

  if (impact < 0) {
    return GlucoseImpact.None;
  } else if (impact < 10) {
    return GlucoseImpact.Low;
  } else if (impact < 20) {
    return GlucoseImpact.Medium;
  } else {
    return GlucoseImpact.High;
  }
}

function calculateKetoScore(nutrition: NutritionalFacts): KetoScore {
  if (nutrition.carbs) {
    const netCarbs = nutrition.carbs - (nutrition.fibre ?? 0);

    if (netCarbs < 3.6) {
      return KetoScore.Keto;
    } else if (netCarbs < 5) {
      return KetoScore.MaybeKeto;
    } else {
      return KetoScore.NotKeto;
    }
  } else {
    return KetoScore.Unknown;
  }
}
