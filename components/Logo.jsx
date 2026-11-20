export default function Logo({ className = "text-2xl" }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold tracking-tight text-white ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-nova-sky text-lg text-nova-navy">⚡</span>
      <span>Tech<span className="text-nova-sky">Nova</span></span>
    </span>
  );
}
