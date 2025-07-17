"use client";

type Unit =
  | "l"
  | "dl"
  | "cl"
  | "ml"
  | "kg"
  | "g"
  | "mg"
  | "tsp"
  | "tbsp"
  | "unit";

type CardIngredientProps = {
  amount: number;
  unit: Unit;
  description: string;
  basePeopleNumber: number;
  peopleNumber: number;
};

export default function IngredientRow({
  amount,
  unit,
  description,
  basePeopleNumber,
  peopleNumber,
}: CardIngredientProps) {
  function scaleAndConvertIngredient(
    amount: number,
    unit: Unit,
    originalPeople: number,
    newPeople: number
  ): { amount: number; unit: Unit } {
    const scale = newPeople / originalPeople;
    let scaledAmount = amount * scale;
    let finalUnit = unit;

    // Mass units
    if (["mg", "g", "kg"].includes(unit)) {
      const mg = toMg(scaledAmount, unit);
      if (mg >= 1_000_000) {
        scaledAmount = mg / 1_000_000;
        finalUnit = "kg";
      } else if (mg >= 1_000) {
        scaledAmount = mg / 1_000;
        finalUnit = "g";
      } else {
        scaledAmount = mg;
        finalUnit = "mg";
      }
    }

    // Volume units
    else if (["ml", "cl", "dl", "l"].includes(unit)) {
      const ml = toMl(scaledAmount, unit);
      if (ml >= 1000) {
        scaledAmount = ml / 1000;
        finalUnit = "l";
      } else if (ml >= 100) {
        scaledAmount = ml / 100;
        finalUnit = "dl";
      } else if (ml >= 10) {
        scaledAmount = ml / 10;
        finalUnit = "cl";
      } else {
        scaledAmount = ml;
        finalUnit = "ml";
      }
    }

    // tsp, tbsp, unit → no conversion, only scale
    else {
      scaledAmount = Math.round(scaledAmount * 100) / 100;
    }

    return {
      amount: Math.round(scaledAmount * 100) / 100,
      unit: finalUnit as Unit,
    };
  }

  function toMg(amount: number, unit: string): number {
    switch (unit) {
      case "kg":
        return amount * 1_000_000;
      case "g":
        return amount * 1_000;
      case "mg":
        return amount;
      default:
        return amount;
    }
  }

  function toMl(amount: number, unit: string): number {
    switch (unit) {
      case "l":
        return amount * 1000;
      case "dl":
        return amount * 100;
      case "cl":
        return amount * 10;
      case "ml":
        return amount;
      default:
        return amount;
    }
  }

  const scaled = scaleAndConvertIngredient(
    amount,
    unit,
    basePeopleNumber,
    peopleNumber
  );

  return (
    <p className="text-titleBlue font-inter text-base">
      {scaled.amount + scaled.unit + " " + description}
    </p>
  );
}
