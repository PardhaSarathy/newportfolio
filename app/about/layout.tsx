import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile | Pardhu",
    description: "AI Systems Architect specializing in autonomous agents and backend scale.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
