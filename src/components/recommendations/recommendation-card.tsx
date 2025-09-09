import type { GenerateCropRecommendationOutput } from "@/ai/flows/generate-crop-recommendation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Droplets, Sprout, Bug } from "lucide-react";

type RecommendationCardProps = {
  recommendation: GenerateCropRecommendationOutput;
};

const InfoItem = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-primary">{icon}</div>
        <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-muted-foreground">{children}</p>
        </div>
    </div>
);


export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const confidencePercent = recommendation.confidenceScore * 100;

  return (
    <Card className="shadow-lg animate-in fade-in-50">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <CardTitle className="text-2xl font-headline">Your AI Recommendation</CardTitle>
                <CardDescription>Based on your farm's unique profile.</CardDescription>
            </div>
            <div className="w-full sm:w-auto text-right">
                <p className="text-sm font-medium">Confidence Score</p>
                <div className="flex items-center gap-2">
                    <Progress value={confidencePercent} className="w-24"/>
                    <span className="font-bold text-primary">{confidencePercent.toFixed(0)}%</span>
                </div>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-accent/50 p-6 rounded-lg">
            <h2 className="text-lg font-bold">Recommended Crop</h2>
            <div className="flex items-center gap-2 mt-2">
                <Leaf className="w-8 h-8 text-primary"/>
                <p className="text-3xl font-bold text-primary">{recommendation.recommendedCrop}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem icon={<Sprout className="w-6 h-6"/>} title="Fertilizer Recommendation">
                {recommendation.fertilizerRecommendation}
            </InfoItem>
            <InfoItem icon={<Droplets className="w-6 h-6"/>} title="Irrigation Schedule">
                {recommendation.irrigationSchedule}
            </InfoItem>
            <InfoItem icon={<Bug className="w-6 h-6"/>} title="Pest Control Tips">
                {recommendation.pestControlTips}
            </InfoItem>
        </div>
      </CardContent>
    </Card>
  );
}
