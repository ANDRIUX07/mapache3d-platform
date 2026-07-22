import { PackagePlus } from "lucide-react";

type ProductPlaceholderCardProps = {
  position: number;
};

export function ProductPlaceholderCard({
  position,
}: ProductPlaceholderCardProps) {
  return (
    <article
      aria-hidden="true"
      className="flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-dashed border-white/10 bg-white/[0.015]"
    >
      <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-violet-500/[0.04] to-cyan-500/[0.02]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
          <PackagePlus
            size={24}
            className="text-white/15"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <div className="h-2.5 w-16 rounded-full bg-white/[0.04]" />
        <div className="mt-3 h-4 w-4/5 rounded-full bg-white/[0.045]" />
        <div className="mt-2 h-4 w-3/5 rounded-full bg-white/[0.035]" />

        <div className="mt-4 space-y-2">
          <div className="h-2.5 w-full rounded-full bg-white/[0.025]" />
          <div className="h-2.5 w-4/5 rounded-full bg-white/[0.025]" />
        </div>

        <div className="mt-auto pt-5">
          <div className="h-6 w-24 rounded-full bg-white/[0.035]" />
          <div className="mt-3 h-9 w-full rounded-xl border border-dashed border-white/[0.06]" />
        </div>

        <span className="sr-only">
          Espacio para producto número {position}
        </span>
      </div>
    </article>
  );
}