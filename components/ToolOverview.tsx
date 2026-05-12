import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ToolOverviewProps {
  heading: string;
  tagline: string;
  cards: FeatureCard[];
  children?: ReactNode;
}

export default function ToolOverview({ heading, tagline, cards, children }: ToolOverviewProps) {
  return (
    <section className="mt-20">
      <div className="glass rounded-[2rem] border border-primary/10 p-8 md:p-12 shadow-xl shadow-primary/10">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Privacy-first security
            </span>
            <h2 className="mt-6 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {heading}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
              {tagline}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {cards.map((card) => (
              <div key={card.title} className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,156,0.12),transparent_40%)] p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{card.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

          {children ? (
            <div className="space-y-6 text-muted-foreground prose prose-emerald dark:prose-invert">
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
