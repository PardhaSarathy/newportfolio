import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signal | Pardhu",
    description: "Contact Pardhu for collaboration or engineering inquiries.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
