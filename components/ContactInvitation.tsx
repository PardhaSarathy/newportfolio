import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ContactInvitation() {
  return (
    <section
      aria-labelledby="contact-invitation-heading"
      className="border-t border-hairline pt-10 md:pt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
    >
      <div className="space-y-3 max-w-xl">
        <h2 id="contact-invitation-heading" className="text-3xl md:text-4xl font-display font-bold tracking-tight text-text-primary">
          Let’s build something useful.
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Have a project or an engineering opportunity? I’d like to hear about it.
        </p>
      </div>
      <Link
        href="/contact"
        className="inline-flex min-h-12 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full bg-brand-main px-6 py-3 text-sm font-bold text-white dark:text-[#052018] transition-colors duration-150 hover:bg-brand-main/90"
      >
        Get in touch <ArrowUpRight size={18} aria-hidden />
      </Link>
    </section>
  );
}
