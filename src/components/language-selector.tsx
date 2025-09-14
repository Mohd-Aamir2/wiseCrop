"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Globe className="h-4 w-20" />
          <p>Language</p>
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
  );
}
