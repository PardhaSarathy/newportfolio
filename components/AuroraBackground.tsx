/** Static ambient light: the portfolio glow stays still while people read. */
export function AuroraBackground() {
  return (
    <div aria-hidden className="absolute top-0 left-0 w-full h-[800px] -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-bg-mist/50 to-bg-mist" />
      <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-brand-main/20 rounded-full blur-[100px]" />
      <div className="absolute top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-brand-light/60 rounded-full blur-[100px]" />
      <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-accent-lime/40 rounded-full blur-[80px] mix-blend-overlay opacity-50" />
    </div>
  );
}
