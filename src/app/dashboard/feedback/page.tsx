import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { FeedbackForm } from "@/components/feedback/feedback-form";

export default function FeedbackPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        title="Learning & Feedback Loop"
        subtitle="Help us improve by providing feedback on your crop outcomes."
      />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
            <FeedbackForm />
        </div>
      </main>
    </div>
  );
}
