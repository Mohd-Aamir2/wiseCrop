import { SidebarTrigger } from "@/components/ui/sidebar";

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
      <div>
        <h1 className="text-2xl font-bold font-headline">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
    </header>
  );
}
