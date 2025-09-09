import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function SoilHealthWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Soil Health</CardTitle>
        <CardDescription>
          Upload your latest soil health report to get more accurate recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload Report
        </Button>
      </CardContent>
    </Card>
  );
}
