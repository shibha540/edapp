
'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Home, Lightbulb, Newspaper, Trophy, BrainCircuit } from "lucide-react";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/ai-hints", label: "AI Hints", icon: Lightbulb },
    { href: "/ai-explainer", label: "Explainer", icon: BrainCircuit },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/leaderboard", label: "Ranks", icon: Trophy },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden sticky bottom-0 left-0 right-0 bg-card border-t z-30">
            <div className="grid grid-cols-5 h-16">
            {navItems.map((item) => (
                <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                </Link>
            ))}
            </div>
      </nav>
    )
}
