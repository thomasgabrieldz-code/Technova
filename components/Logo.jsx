export default function Logo({ className = "text-2xl" }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold tracking-tight text-white ${className}`}>
      <img src="/favicon-192.png" alt="" aria-hidden="true" width="36" height="36" className="h-9 w-9 rounded-lg object-cover" />
      <span>Tech<span className="text-nova-sky">Nova</span></span>
    </span>
  );
}
