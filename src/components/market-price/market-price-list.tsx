"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { dummyMarketPrices } from "@/lib/dummy-data";
import type { MarketPrice } from "@/lib/types";
import { ArrowUp, ArrowDown, IndianRupee, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SortKey = "price" | "change";
type SortDirection = "asc" | "desc";

export function MarketPriceList() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedAndFilteredPrices = useMemo(() => {
    let prices = dummyMarketPrices.filter((item) =>
      item.crop.toLowerCase().includes(filter.toLowerCase())
    );

    if (sortKey) {
      prices.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return prices;
  }, [filter, sortKey, sortDirection]);

  const SortableHeader = ({ sortKey: key, children }: { sortKey: SortKey, children: React.ReactNode }) => (
    <Button variant="ghost" onClick={() => handleSort(key)} className="px-0 hover:bg-transparent">
        {children}
        {sortKey === key ? (
            sortDirection === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
    </Button>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Market Prices</CardTitle>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            {lastUpdated && (
                <CardDescription>
                    Last updated: {lastUpdated}
                </CardDescription>
            )}
            <div className="w-full sm:w-64">
                 <Input
                    placeholder="Filter by crop..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead>Market Location</TableHead>
              <TableHead className="text-right">
                <div className="flex justify-end items-center">
                    <SortableHeader sortKey="price">Price (per unit)</SortableHeader>
                </div>
              </TableHead>
              <TableHead className="text-right">
                 <div className="flex justify-end items-center">
                    <SortableHeader sortKey="change">Change</SortableHeader>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredPrices.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.crop}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                        <IndianRupee width={12} className="mr-0.5" />
                        <span>{item.price.toLocaleString()} / {item.unit}</span>
                    </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={item.change > 0 ? "default" : "destructive"}
                    className={cn(
                      "flex items-center justify-center gap-1 w-20 ml-auto",
                      item.change > 0 ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800" 
                                   : "bg-red-100 text-red-800 border-red-200 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800"
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
         {sortedAndFilteredPrices.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
                No crops found for "{filter}".
            </div>
        )}
      </CardContent>
    </Card>
  );
}