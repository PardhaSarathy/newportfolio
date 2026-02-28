"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string | null;
    altText?: string;
}

export function CertificateModal({ isOpen, onClose, imageUrl, altText = "Certificate" }: CertificateModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!mounted) return null;

    const modalContent = (
        <AnimatePresence>
            {isOpen && imageUrl && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    {/* Close Button - positioned absolutely on the screen with Green Theme */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-4 right-4 sm:top-6 sm:right-8 p-3 rounded-full transition-all duration-300 z-[10000] 
                                   bg-[#1a1c22] border-2 border-[#00d084] text-[#00d084] hover:bg-[#00d084] hover:text-white shadow-[0_0_15px_rgba(0,208,132,0.3)] hover:shadow-[0_0_20px_rgba(0,208,132,0.6)]"
                        aria-label="Close modal"
                    >
                        <X size={28} strokeWidth={2.5} />
                    </button>

                    {/* Modal Content container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden bg-brand-dark/50 shadow-2xl flex items-center justify-center p-2 sm:p-4"
                        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
                    >

                        <div className="relative w-full h-[80vh] sm:h-[85vh]">
                            <Image
                                src={imageUrl}
                                alt={altText}
                                fill
                                className="object-contain rounded-xl"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
