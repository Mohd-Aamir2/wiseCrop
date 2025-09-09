import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        title="Settings"
        subtitle="Manage your account and application preferences."
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
            <SettingsForm />
        </div>
      </main>
    </div>
  );
}
