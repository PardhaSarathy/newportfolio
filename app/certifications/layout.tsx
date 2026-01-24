import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shelf | Pardhu",
    description: "Education, certifications, and continuous learning journey.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
