"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { dummyAlerts } from "@/lib/dummy-data";
import { Sun, Bug, CalendarClock, Megaphone } from "lucide-react";

const alertIcons: { [key: string]: React.ReactNode } = {
  weather: <Sun className="w-6 h-6 text-yellow-500" />,
  pest: <Bug className="w-6 h-6 text-red-500" />,
  schedule: <CalendarClock className="w-6 h-6 text-blue-500" />,
  gov: <Megaphone className="w-6 h-6 text-indigo-500" />,
};

export function AlertsList() {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {dummyAlerts.map((alert) => (
        <Card key={alert.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              {alertIcons[alert.type] || <Megaphone className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <CardTitle>{alert.title}</CardTitle>
                <span className="text-xs text-muted-foreground">
                  {new Date(alert.date).toLocaleDateString()}
                </span>
              </div>
              <CardDescription className="mt-1">{alert.description}</CardDescription>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
