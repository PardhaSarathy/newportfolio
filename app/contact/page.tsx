"use client";

import { Card } from "@/components/ui/Card";
import { Send, Mail, Linkedin, Github, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { clsx } from "clsx";
import { useState } from "react";

// Zod Schema (Strict Validation)
const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    interest: z.enum(["collaboration", "engineering", "consultation", "just to say hi"]),
    email: z.string().email({ message: "Invalid email address" }),
});

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            interest: "collaboration"
        }
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Form Data:", data);
        const subject = `Signal from ${data.name}: ${data.interest}`;
        const body = `Name: ${data.name}\nInterest: ${data.interest}\nEmail: ${data.email}`;
        // Fallback to mailto for this static demo
        window.location.href = `mailto:pardhu.karnati2003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setIsSubmitting(false);
    };

    return (
        <div className="relative min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700 pb-32 md:pb-40">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-light/40 rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-emerald-200/30 rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            <div className="mb-8 text-center relative z-10">
                <h1 className="text-4xl font-display font-bold text-text-primary">Signal</h1>
                <p className="text-text-secondary mt-2">Broadcast a message frequency.</p>
            </div>

            <Card className="max-w-2xl w-full !p-8 md:p-14 border-2 border-brand-light dark:border-white/10 shadow-xl bg-white/50 dark:bg-[#0F261E]/80 backdrop-blur-md relative overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)} className="text-xl md:text-2xl leading-relaxed text-text-primary font-medium flex flex-wrap items-baseline gap-x-2 gap-y-6 md:gap-y-8">

                    {/* Name Field */}
                    <span className="opacity-50">Hello, my name is</span>
                    <div className="relative flex-1 min-w-[160px] max-w-full">
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="your name"
                            aria-label="Your Name"
                            disabled={isSubmitting}
                            className={clsx(
                                "bg-transparent border-b-2 outline-none px-2 w-full transition-colors placeholder:text-gray-300 dark:placeholder:text-[#8EBAAA]/50",
                                errors.name ? "border-red-400" : "border-gray-200 dark:border-white/20 focus:border-brand-main dark:focus:border-[#2CC082] hover:border-gray-300 dark:hover:border-white/40"
                            )}
                        />
                        {errors.name && <p className="absolute -bottom-6 left-0 text-xs text-red-500 font-mono">{errors.name.message}</p>}
                    </div>

                    {/* Interest Dropdown */}
                    <span className="opacity-50 w-full md:w-auto mt-2 md:mt-0">and I'm looking for</span>
                    <div className="relative flex-1 min-w-[200px] max-w-full">
                        <select
                            {...register("interest")}
                            disabled={isSubmitting}
                            aria-label="Your Interest"
                            className="w-full appearance-none bg-transparent border-b-2 border-gray-200 dark:border-white/20 focus:border-brand-main dark:focus:border-[#2CC082] outline-none px-2 pr-8 cursor-pointer hover:border-gray-300 dark:hover:border-white/40 transition-colors text-brand-dark dark:text-[#D1EBE1]"
                        >
                            <option value="collaboration" className="bg-white dark:bg-[#0A1C16]">collaboration</option>
                            <option value="engineering" className="bg-white dark:bg-[#0A1C16]">engineering</option>
                            <option value="consultation" className="bg-white dark:bg-[#0A1C16]">consultation</option>
                            <option value="just to say hi" className="bg-white dark:bg-[#0A1C16]">just to say hi</option>
                        </select>
                    </div>
                    <span>.</span>

                    {/* Email Field */}
                    <span className="opacity-50 w-full lg:w-auto lg:ml-2 mt-2 lg:mt-0">You can reach me at</span>
                    <div className="relative flex-1 min-w-[220px] max-w-full">
                        <input
                            {...register("email")}
                            type="text"
                            placeholder="your email address"
                            aria-label="Your Email"
                            disabled={isSubmitting}
                            className={clsx(
                                "bg-transparent border-b-2 outline-none px-2 w-full transition-colors placeholder:text-gray-300 dark:placeholder:text-[#8EBAAA]/50",
                                errors.email ? "border-red-400" : "border-gray-200 dark:border-white/20 focus:border-brand-main dark:focus:border-[#2CC082] hover:border-gray-300 dark:hover:border-white/40"
                            )}
                        />
                        {errors.email && <p className="absolute -bottom-6 left-0 text-xs text-red-500 font-mono">{errors.email.message}</p>}
                    </div>
                    <span>.</span>

                    {/* Submit Button */}
                    <div className="pt-10 flex justify-center md:justify-end">
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={clsx(
                                "flex items-center gap-2 px-8 py-3 bg-brand-main text-white rounded-full font-bold text-lg shadow-lg shadow-brand-main/30 transition-all",
                                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-brand-main/50"
                            )}
                        >
                            {isSubmitting ? <Loader2 className="animate-spin relative" size={24} /> : (
                                <>Send Signal <Send size={20} /></>
                            )}
                        </motion.button>
                    </div>
                </form>
            </Card>

            {/* Footer Connections */}
            <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-text-secondary opacity-60 hover:opacity-100 transition-opacity">
                    <Mail size={16} />
                    <a href="mailto:pardhu.karnati2003@gmail.com" className="hover:underline">pardhu.karnati2003@gmail.com</a>
                </div>
                <div className="flex gap-4">
                    <a href="https://www.linkedin.com/in/pardhasaradhireddy" target="_blank" className="p-2 bg-white dark:bg-white/5 rounded-full shadow-sm text-text-secondary dark:text-[#8EBAAA] hover:text-[#0077b5] dark:hover:text-[#A9F0D4] dark:hover:bg-white/10 hover:scale-110 transition-all">
                        <Linkedin size={20} />
                    </a>
                    <a href="https://github.com/PardhaSarathy" target="_blank" className="p-2 bg-white dark:bg-white/5 rounded-full shadow-sm text-text-secondary dark:text-[#8EBAAA] hover:text-black dark:hover:text-white dark:hover:bg-white/10 hover:scale-110 transition-all">
                        <Github size={20} />
                    </a>
                </div>
            </div>

        </div>
    )
}
