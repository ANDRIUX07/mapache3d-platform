"use client";

import { calculateProductCost } from "../services/cost-calculator";

type Props = {
  weightGrams: number;
  printTimeMinutes: number;
  salePrice: number;
};

function money(value: number) {
  return `Q${value.toFixed(2)}`;
}

export function ProductionCostCard({
  weightGrams,
  printTimeMinutes,
  salePrice,
}: Props) {
  const cost = calculateProductCost({
    weightGrams,
    printTimeMinutes,
    salePrice,
  });

  return (
    <section className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-6">
      <h2 className="text-xl font-bold text-violet-200">Costos automáticos</h2>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-white/60">Costo PLA</span>
          <span>{money(cost.filamentCost)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-white/60">Electricidad</span>
          <span>{money(cost.electricityCost)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-white/60">Desgaste máquina</span>
          <span>{money(cost.machineWearCost)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-white/60">Mano de obra</span>
          <span>{money(cost.laborCost)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-white/60">Accesorios</span>
          <span>{money(cost.accessoriesCost)}</span>
        </div>

        <div className="flex justify-between border-t border-white/10 pt-3 font-bold">
          <span>Costo total</span>
          <span>{money(cost.totalCost)}</span>
        </div>

        <div className="flex justify-between text-emerald-300">
          <span>Ganancia</span>
          <span>{money(cost.profit)}</span>
        </div>

        <div className="flex justify-between text-violet-200">
          <span>Margen</span>
          <span>{cost.marginPercent.toFixed(1)}%</span>
        </div>
      </div>
    </section>
  );
}