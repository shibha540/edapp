
'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Home, Lightbulb, Newspaper, Trophy, BrainCircuit } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSidebar } from "./ui/sidebar";
import { SidebarContent as MobileSidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/ai-hints", label: "AI Hints", icon: Lightbulb },
    { href: "/ai-explainer", label: "AI Explainer", icon: BrainCircuit },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

export function MobileNav() {
    const pathname = usePathname();
    const { openMobile, setOpenMobile } = useSidebar();
    const isMobile = useIsMobile();

    if (!isMobile) {
        return null;
    }

    return (
        <>
            <nav className="sticky bottom-0 left-0 right-0 bg-card border-t z-30">
                <div className="grid grid-cols-5 h-16">
                {navItems.map((item) => (
                    <Link
                    key={item.label}
                    href={item.href}
                    className={`flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                    >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label === 'AI Explainer' ? 'Explainer' : item.label === 'Leaderboard' ? 'Ranks' : item.label}</span>
                    </Link>
                ))}
                </div>
            </nav>
            <Sheet open={openMobile} onOpenChange={setOpenMobile}>
                <SheetContent side="left" className="p-0 w-72">
                    <MobileSidebarContent className="pt-6">
                        <SidebarMenu>
                             {navItems.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <Link href={item.href} legacyBehavior passHref>
                                        <SidebarMenuButton asChild isActive={pathname === item.href} onClick={() => setOpenMobile(false)}>
                                            <div>
                                                <item.icon />
                                                <span>{item.label}</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </MobileSidebarContent>
                </SheetContent>
            </Sheet>
        </>
    )
}
