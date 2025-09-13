"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Lightbulb,
  Bell,
  MessageSquare,
  LogOut,
  LifeBuoy,
  User,
  HeartPulse,
  Bot,
  TestTube2,
  DollarSign,
  Landmark,
} from 'lucide-react';
import { Logo } from '@/components/logo';

const navItems = [
  { href: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
  { href: '/dashboard/recommendations', icon: <Lightbulb />, label: 'Recommendations' },
  { href: '/dashboard/health-report', icon: <HeartPulse />, label: 'Health Report' },
  { href: '/dashboard/soil-health', icon: <TestTube2 />, label: 'Soil Health' },
  { href: '/dashboard/market-price', icon: <DollarSign />, label: 'Market Prices' },
  { href: '/dashboard/schemes', icon: <Landmark />, label: 'Govt. Schemes' },
  { href: '/dashboard/alerts', icon: <Bell />, label: 'Alerts' },
  { href: '/dashboard/feedback', icon: <MessageSquare />, label: 'Feedback' },
  { href: '/dashboard/chatbot', icon: <Bot />, label: 'Chatbot' },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  asChild
                >
                  <div>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarSeparator />
        <SidebarMenu>
           <SidebarMenuItem>
              <Link href="/dashboard/edit-profile">
                <SidebarMenuButton tooltip="Edit Profile" isActive={pathname === '/dashboard/edit-profile'} asChild>
                  <div>
                    <User />
                    <span>Edit Profile</span>
                  </div>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="mailto:support@kisaan.com">
              <SidebarMenuButton tooltip="Support" asChild>
                <div>
                    <LifeBuoy />
                    <span>Support</span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/">
                <SidebarMenuButton tooltip="Log Out" asChild>
                  <div>
                    <LogOut />
                    <span>Log Out</span>
                  </div>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
        <div className="flex items-center gap-3 p-2">
            <Avatar>
                <AvatarImage src="https://picsum.photos/100/100" alt="User Avatar" data-ai-hint="person avatar" />
                <AvatarFallback>JF</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
                <p className="font-semibold truncate">John Farmer</p>
                <p className="text-xs text-muted-foreground truncate">john.farmer@example.com</p>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
