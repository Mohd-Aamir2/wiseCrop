import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

type DashboardHeaderProps = {
  title: string;
  subtitle?: string;
};

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="flex items-center gap-4 p-4 border-b">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-grow">
        <h1 className="text-2xl font-bold font-headline">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Globe className="h-4 w-4" />
            <span className="sr-only">Select Language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>हिंदी (Hindi)</DropdownMenuItem>
          <DropdownMenuItem>தமிழ் (Tamil)</DropdownMenuItem>
          <DropdownMenuItem>मराठी (Marathi)</DropdownMenuItem>
          <DropdownMenuItem>తెలుగు (Telugu)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
