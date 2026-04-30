import { ShieldCheck, Lock, EyeOff, Globe } from 'lucide-react';

const badges = [
  { icon: ShieldCheck, text: "AES-256 Encryption", color: "text-primary" },
  { icon: EyeOff, text: "Client-Side Only", color: "text-emerald-400" },
  { icon: Lock, text: "No Data Stored", color: "text-cyan-400" },
  { icon: Globe, text: "Open Standards", color: "text-teal-400" },
];

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 py-10 border-y border-border bg-primary/[0.02]">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
            <badge.icon className={`w-5 h-5 ${badge.color} group-hover:scale-110 transition-transform`} />
          </div>
          <span className="text-sm font-bold tracking-tight text-muted-foreground group-hover:text-foreground transition-colors uppercase">
            {badge.text}
          </span>
        </div>
      ))}
    </div>
  );
}
