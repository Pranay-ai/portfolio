export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[--cream] to-[--ivory] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Elegant loading animation */}
        <div className="relative">
          <div className="w-12 h-12 border border-[--sage-muted] animate-spin" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-2 border border-[--sage] animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
          <div className="absolute inset-4 w-4 h-4 bg-[--sage-light] animate-pulse" />
        </div>
        <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-[--taupe]">
          Loading
        </p>
      </div>
    </div>
  );
}
