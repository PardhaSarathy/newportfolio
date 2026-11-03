"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import {
  Copy,
  Check,
  ArrowUpRight,
  Mail,
  Linkedin,
  Github,
  ChevronDown,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { clsx } from "clsx";

const EMAIL = "pardhu.karnati2003@gmail.com";

const INTERESTS = [
  "collaboration",
  "engineering",
  "consultation",
  "just to say hi",
] as const;

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Name is required" }),
  interest: z.enum(INTERESTS),
  email: z.string().trim().email({ message: "Invalid email address" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "A little more detail, please" }),
});

type FormValues = z.infer<typeof formSchema>;

const FIELD_BASE =
  "bg-transparent border-b-2 outline-none px-2 w-full transition-colors placeholder:text-text-muted";

export default function ContactPage() {
  const reduceMotion = useReducedMotion();
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const [draftReady, setDraftReady] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { interest: "collaboration" },
  });

  // Static site: hand off to the user's mail client. No artificial delay —
  // the spinner used to imply a send that never happened.
  const onSubmit = (data: FormValues) => {
    const subject = `Signal from ${data.name}: ${data.interest}`;
    const body = `${data.message}\n\n—\n${data.name}\n${data.email}`;
    setDraftReady(true);
    window.location.assign(
      `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700 pb-24">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-light/40 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-brand-main/15 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="mb-8 text-center relative z-10">
        <h1 className="text-4xl font-display font-bold text-text-primary">
          Signal
        </h1>
        <p className="text-text-secondary mt-2">
          A project, an opportunity, or just a hello.
        </p>
      </div>

      <div className="w-full mb-8 px-5 py-5 rounded-2xl bg-bg-card/70 border border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="min-w-0 text-center sm:text-left">
          <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-2">
            Prefer a direct email?
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 text-sm sm:text-base text-text-primary font-semibold hover:text-brand-main transition-colors break-all"
          >
            <Mail size={17} className="shrink-0" aria-hidden />
            {EMAIL}
          </a>
        </div>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex shrink-0 items-center gap-2 px-4 py-2.5 rounded-full border border-hairline text-sm font-semibold text-brand-main hover:bg-brand-main/10 focus-visible:outline-2 focus-visible:outline-brand-main focus-visible:outline-offset-4 transition-colors"
        >
          {copyStatus === "copied" ? (
            <Check size={16} aria-hidden />
          ) : (
            <Copy size={16} aria-hidden />
          )}
          {copyStatus === "copied" ? "Copied" : "Copy email"}
        </button>
      </div>
      <p role="status" className="sr-only">
        {copyStatus === "copied" ? "Email address copied to clipboard." : ""}
      </p>
      {copyStatus === "error" && (
        <p role="status" className="text-sm text-text-secondary mb-6">
          Select and copy the email address above, or tap it to open your email
          app.
        </p>
      )}

      <Card
        hoverEffect={false}
        className="w-full p-8 md:p-12 border-2 border-hairline shadow-xl bg-bg-card/80 backdrop-blur-md relative overflow-hidden"
      >
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="text-lg md:text-xl leading-relaxed text-text-primary font-medium space-y-8"
        >
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-text-secondary">
              Hello, my name is
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              placeholder="your name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={clsx(
                FIELD_BASE,
                errors.name
                  ? "border-red-500"
                  : "border-hairline focus:border-brand-main hover:border-brand-main/50",
              )}
            />
            {errors.name && (
              <p
                id="name-error"
                className="text-xs text-red-700 dark:text-red-300 font-mono"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Interest */}
          <div className="space-y-2">
            <label htmlFor="interest" className="block text-text-secondary">
              and I&apos;m looking for
            </label>
            <div className="relative">
              <select
                {...register("interest")}
                id="interest"
                className={clsx(
                  FIELD_BASE,
                  "appearance-none pr-8 cursor-pointer border-hairline focus:border-brand-main hover:border-brand-main/50",
                )}
              >
                {INTERESTS.map((option) => (
                  <option
                    key={option}
                    value={option}
                    className="bg-bg-card text-text-primary"
                  >
                    {option}
                  </option>
                ))}
              </select>
              {/* The select is appearance-none; without this there was no
                                affordance at all and it read as a text input. */}
              <ChevronDown
                size={20}
                aria-hidden
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-text-secondary">
              You can reach me at
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="your email address"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={clsx(
                FIELD_BASE,
                errors.email
                  ? "border-red-500"
                  : "border-hairline focus:border-brand-main hover:border-brand-main/50",
              )}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-xs text-red-700 dark:text-red-300 font-mono"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-text-secondary">
              Here&apos;s what I have in mind
            </label>
            <textarea
              {...register("message")}
              id="message"
              rows={4}
              placeholder="a few lines about your project, timeline, or question"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={clsx(
                "bg-transparent border-2 rounded-2xl outline-none p-3 w-full text-base transition-colors resize-y placeholder:text-text-muted",
                errors.message
                  ? "border-red-500"
                  : "border-hairline focus:border-brand-main hover:border-brand-main/50",
              )}
            />
            {errors.message && (
              <p
                id="message-error"
                className="text-xs text-red-700 dark:text-red-300 font-mono"
              >
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex justify-center md:justify-end pt-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3 bg-brand-main text-white dark:text-[#052018] rounded-full font-bold text-lg shadow-lg shadow-brand-main/30 hover:shadow-brand-main/50 transition-shadow disabled:opacity-70"
            >
              Compose email <ArrowUpRight size={20} aria-hidden />
            </motion.button>
          </div>

          <p className="text-sm text-text-muted text-center md:text-right">
            Opens an email draft. Review it before sending.
          </p>
          <p
            role="status"
            className="text-sm text-text-secondary leading-relaxed"
          >
            {draftReady
              ? "Your email app will open with a draft. If it doesn’t open, use the direct email address above."
              : ""}
          </p>
        </form>
      </Card>

      {/* Footer Connections */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <p className="text-sm text-text-muted">Or find me here</p>
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/pardhasaradhireddy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 bg-bg-card rounded-full shadow-sm text-text-secondary hover:text-brand-main hover:scale-110 active:scale-95 transition-all"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/PardhaSarathy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 bg-bg-card rounded-full shadow-sm text-text-secondary hover:text-brand-main hover:scale-110 active:scale-95 transition-all"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
