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
        <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700">

            <div className="mb-8 text-center">
                <h1 className="text-4xl font-display font-bold text-text-primary">Signal</h1>
                <p className="text-text-secondary mt-2">Broadcast a message frequency.</p>
            </div>

            <Card className="max-w-2xl w-full !p-10 md:p-14 border-2 border-brand-light shadow-xl bg-white/50 backdrop-blur-sm relative overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)} className="text-xl md:text-2xl leading-relaxed text-text-primary font-medium space-y-4">

                    {/* Name Field */}
                    <div className="inline-block relative">
                        <span className="opacity-50">Hello, my name is </span>
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="your name"
                            aria-label="Your Name"
                            disabled={isSubmitting}
                            className={clsx(
                                "bg-transparent border-b-2 outline-none px-2 min-w-[200px] transition-colors placeholder:text-gray-300",
                                errors.name ? "border-red-400" : "border-gray-200 focus:border-brand-main hover:border-gray-300"
                            )}
                        />
                        {errors.name && <p className="absolute -bottom-6 left-0 text-xs text-red-500 font-mono">{errors.name.message}</p>}
                    </div>

                    {/* Interest Dropdown */}
                    <span className="opacity-50"> and I'm looking for </span>
                    <div className="inline-block relative">
                        <select
                            {...register("interest")}
                            disabled={isSubmitting}
                            aria-label="Your Interest"
                            className="appearance-none bg-transparent border-b-2 border-gray-200 focus:border-brand-main outline-none px-2 pr-8 cursor-pointer hover:border-gray-300 transition-colors text-brand-dark"
                        >
                            <option value="collaboration">collaboration</option>
                            <option value="engineering">engineering</option>
                            <option value="consultation">consultation</option>
                            <option value="just to say hi">just to say hi</option>
                        </select>
                    </div>
                    <span>. </span>

                    <br className="hidden md:block" />

                    {/* Email Field */}
                    <div className="inline-block relative">
                        <span className="opacity-50">You can reach me at </span>
                        <input
                            {...register("email")}
                            type="text"
                            placeholder="your email"
                            aria-label="Your Email"
                            disabled={isSubmitting}
                            className={clsx(
                                "bg-transparent border-b-2 outline-none px-2 min-w-[250px] transition-colors placeholder:text-gray-300",
                                errors.email ? "border-red-400" : "border-gray-200 focus:border-brand-main hover:border-gray-300"
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
                    <a href="https://www.linkedin.com/in/pardhasaradhireddy" target="_blank" className="p-2 bg-white rounded-full shadow-sm text-text-secondary hover:text-[#0077b5] hover:scale-110 transition-all">
                        <Linkedin size={20} />
                    </a>
                    <a href="https://github.com/PardhaSarathy" target="_blank" className="p-2 bg-white rounded-full shadow-sm text-text-secondary hover:text-black hover:scale-110 transition-all">
                        <Github size={20} />
                    </a>
                </div>
            </div>

        </div>
    )
}
