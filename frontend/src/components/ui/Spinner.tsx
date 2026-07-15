export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <div className="w-10 h-10 rounded-full border-2 border-line border-t-gold animate-spin" />
      {label && <p className="text-ink2 font-body text-sm">{label}</p>}
    </div>
  );
}
