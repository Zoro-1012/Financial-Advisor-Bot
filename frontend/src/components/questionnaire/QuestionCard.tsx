import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

interface QuestionCardProps {
  eyebrow: string;
  question: string;
  helper?: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}

export function QuestionCard({
  eyebrow,
  question,
  helper,
  children,
  onNext,
  onBack,
  nextDisabled,
  nextLabel = "Continue",
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-xl"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-gold mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight mb-3">
        {question}
      </h2>
      {helper && <p className="text-ink2 mb-8 leading-relaxed">{helper}</p>}
      {!helper && <div className="mb-8" />}

      <div className="mb-10">{children}</div>

      <div className="flex items-center gap-3">
        {onBack && (
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
        )}
        <Button onClick={onNext} disabled={nextDisabled}>
          {nextLabel}
        </Button>
      </div>
    </motion.div>
  );
}
