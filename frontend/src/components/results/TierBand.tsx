import { motion } from "framer-motion";
import { TierResult } from "../../types";
import { InstrumentCard } from "./InstrumentCard";

const BAND_BG = {
  safe: "bg-depth-safe",
  balanced: "bg-depth-balanced",
  aggressive: "bg-depth-aggressive",
};

const BAND_DOT = {
  safe: "bg-safe",
  balanced: "bg-balanced",
  aggressive: "bg-aggressive",
};

export function TierBand({ tier, index }: { tier: TierResult; index: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className={`rounded-3xl border border-line p-6 md:p-8 ${BAND_BG[tier.tier]}`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className={`w-2.5 h-2.5 rounded-full ${BAND_DOT[tier.tier]}`} />
        <h3 className="font-display text-2xl font-medium text-white">{tier.label}</h3>
      </div>
      <p className="text-ink2 mb-6 max-w-2xl">{tier.riskBandDescription}</p>

      {tier.instruments.length === 0 ? (
        <p className="text-ink2 text-sm italic">
          No matches in this tier for your current inputs — usually means your horizon or
          liquidity need ruled these out. That's expected, not an error.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tier.instruments.map((instrument) => (
            <InstrumentCard key={instrument.id} instrument={instrument} />
          ))}
        </div>
      )}
    </motion.section>
  );
}
