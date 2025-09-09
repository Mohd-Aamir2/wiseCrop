import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyHistoricalOutcomes } from "@/lib/dummy-data";

export function HistoricalDataWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Crop Data</CardTitle>
        <CardDescription>A look at past performance in similar conditions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead>Fertilizer</TableHead>
              <TableHead className="text-right">Yield (kg/ha)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyHistoricalOutcomes.map((outcome) => (
              <TableRow key={outcome.cropType}>
                <TableCell className="font-medium">{outcome.cropType}</TableCell>
                <TableCell>{outcome.fertilizerUsed}</TableCell>
                <TableCell className="text-right">{outcome.yield.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
