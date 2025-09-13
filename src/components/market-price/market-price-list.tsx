"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { dummyMarketPrices } from "@/lib/dummy-data";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function MarketPriceList() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Market Prices</CardTitle>
        {lastUpdated && (
          <CardDescription>
            Last updated: {lastUpdated}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead>Market Location</TableHead>
              <TableHead className="text-right">Price (per {dummyMarketPrices[0]?.unit || 'unit'})</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyMarketPrices.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.crop}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell className="text-right">
                  ₹{item.price.toLocaleString()} / {item.unit}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={item.change > 0 ? "default" : "destructive"}
                    className={cn(
                      "flex items-center justify-center gap-1 w-20 ml-auto",
                      item.change > 0 ? "bg-green-600/20 text-green-700 border-green-600/30 hover:bg-green-600/30" : "bg-red-600/20 text-red-700 border-red-600/30 hover:bg-red-600/30"
                    )}
                  >
                    {item.change > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {Math.abs(item.change)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
