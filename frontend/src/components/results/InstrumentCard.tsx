import { MatchedInstrument, Tier } from "../../types";

const TIER_TEXT_COLOR: Record<Tier, string> = {
  safe: "text-safe",
  balanced: "text-balanced",
  aggressive: "text-aggressive",
};

const TIER_BORDER_COLOR: Record<Tier, string> = {
  safe: "border-safe/30 hover:border-safe/60",
  balanced: "border-balanced/30 hover:border-balanced/60",
  aggressive: "border-aggressive/30 hover:border-aggressive/60",
};

export function InstrumentCard({ instrument }: { instrument: MatchedInstrument }) {
  return (
    <div
      className={`bg-surface border rounded-2xl p-5 transition-colors duration-200 ${TIER_BORDER_COLOR[instrument.tier]}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h4 className="font-display text-lg font-medium text-white">{instrument.name}</h4>
          <p className="text-ink2 text-xs font-mono uppercase tracking-wide mt-0.5">
            {instrument.category}
          </p>
        </div>
        {instrument.niche && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-gold/15 text-gold">
            Niche pick
          </span>
        )}
      </div>

      <p className="text-sm text-white/80 leading-relaxed mb-4">{instrument.description}</p>

      <div className="grid grid-cols-3 gap-3 mb-4 font-mono text-xs">
        <div>
          <p className="text-ink2 mb-1">Return</p>
          <p className={`font-tabular ${TIER_TEXT_COLOR[instrument.tier]}`}>
            {instrument.expectedReturnMin}–{instrument.expectedReturnMax}%
          </p>
        </div>
        <div>
          <p className="text-ink2 mb-1">Liquidity</p>
          <p className="text-white capitalize">{instrument.liquidity}</p>
        </div>
        <div>
          <p className="text-ink2 mb-1">Min. amount</p>
          <p className="text-white font-tabular">₹{instrument.minInvestment.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="pt-3 border-t border-line">
        <p className="text-xs text-ink2 mb-1 font-mono uppercase tracking-wide">Why this fits you</p>
        <p className="text-sm text-white/90 leading-relaxed">{instrument.fitReason}</p>
      </div>
    </div>
  );
}
