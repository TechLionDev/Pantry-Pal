"use client";

import * as React from "react";
import { Moon, Sun, MonitorSmartphone } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();
  let currTheme = localStorage.getItem("theme") || "system";
  function cycleTheme() {
    setTheme(() => {
      switch (currTheme) {
        case "light":
          return "dark";
        case "dark":
          return "system";
        case "system":
          return "light";
        default:
          return "system";
      }
    });
  }
  return (
    <>
      <Button variant='link' size='icon' onClick={cycleTheme}>
        {currTheme === "light" && (
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        )}
        {currTheme === "dark" && (
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        )}
        {currTheme === "system" && (
          <MonitorSmartphone className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all' />
        )}
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </>
  );
}
