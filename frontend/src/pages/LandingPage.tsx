import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";

export function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl text-center"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-gold mb-6">
          Five questions. One plan.
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-medium leading-[1.1] mb-6">
          Find out how deep you can{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-safe via-balanced to-aggressive">
            comfortably go.
          </span>
        </h1>
        <p className="text-ink2 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
          Answer five honest questions about your budget, timeline, and risk appetite. Get back
          real options — from safe to niche — mapped to what actually fits you.
        </p>
        <Button onClick={onStart} className="text-base px-8 py-4">
          Start the questionnaire
        </Button>
      </motion.div>
    </div>
  );
}
