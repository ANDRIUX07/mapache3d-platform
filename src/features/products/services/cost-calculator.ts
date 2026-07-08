export type CostInput = {
  weightGrams: number;
  printTimeMinutes: number;
  salePrice: number;
};

export type CostResult = {
  filamentCost: number;
  electricityCost: number;
  machineWearCost: number;
  laborCost: number;
  accessoriesCost: number;
  totalCost: number;
  profit: number;
  marginPercent: number;
};

const PLA_ROLL_PRICE = 179;
const PLA_ROLL_GRAMS = 1000;

const ELECTRICITY_COST_PER_HOUR = 0.35;
const MACHINE_WEAR_PER_HOUR = 1.25;
const LABOR_FIXED_COST = 1;
const ACCESSORIES_FIXED_COST = 1;

export function calculateProductCost(input: CostInput): CostResult {
  const hours = input.printTimeMinutes / 60;

  const filamentCost = (input.weightGrams / PLA_ROLL_GRAMS) * PLA_ROLL_PRICE;
  const electricityCost = hours * ELECTRICITY_COST_PER_HOUR;
  const machineWearCost = hours * MACHINE_WEAR_PER_HOUR;
  const laborCost = LABOR_FIXED_COST;
  const accessoriesCost = ACCESSORIES_FIXED_COST;

  const totalCost =
    filamentCost +
    electricityCost +
    machineWearCost +
    laborCost +
    accessoriesCost;

  const profit = input.salePrice - totalCost;

  const marginPercent =
    input.salePrice > 0 ? (profit / input.salePrice) * 100 : 0;

  return {
    filamentCost,
    electricityCost,
    machineWearCost,
    laborCost,
    accessoriesCost,
    totalCost,
    profit,
    marginPercent,
  };
}