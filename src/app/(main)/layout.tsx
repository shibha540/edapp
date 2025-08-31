
'use client';

import Link from "next/link";
import { BrainCircuit, Lightbulb, Newspaper, Trophy, Search, BookOpen, Home } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type {FormEvent} from 'react';

import { Input } from "@/components/ui/input";
import { UserNav } from "@/components/user-nav";
import { MobileNav } from "@/components/mobile-nav";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/ai-hints", label: "AI Hints", icon: Lightbulb },
    { href: "/ai-explainer", label: "AI Explainer", icon: BrainCircuit },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    if(searchQuery.trim()){
      router.push(`/?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/');
    }
  };


  return (
    <SidebarProvider>
    <div className="flex flex-col min-h-screen w-full">
      <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30">
        <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="hidden sm:inline-block">EduConnect</span>
            </Link>
        </div>
        
        <div className="w-full flex-1">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                name="search"
                placeholder="Search problems..."
                className="w-full appearance-none bg-background pl-8 shadow-none sm:w-2/3 md:w-1/2 lg:w-1/3"
                defaultValue={searchParams.get('q') ?? ''}
              />
            </div>
          </form>
        </div>
        <UserNav />
      </header>
      <div className="flex flex-1">
        <Sidebar className="hidden md:block" collapsible="icon">
          <SidebarContent>
            <SidebarMenu>
                {navItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                            <Link href={item.href}>
                                <item.icon />
                                <span>{item.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
    </SidebarProvider>
  );
}
