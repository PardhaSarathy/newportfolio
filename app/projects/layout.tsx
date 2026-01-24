import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lab | Pardhu",
    description: "Showcase of AI projects, machine learning models, and full-stack applications.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
