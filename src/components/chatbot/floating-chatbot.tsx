"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Chatbot } from "@/components/chatbot/chatbot";
import { MessageSquare, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg z-40 p-0 overflow-hidden"
          aria-label="Toggle Chatbot"
        >
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
              >
                <X className="w-8 h-8" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
              >
                <Image
                  src="https://picsum.photos/seed/bot/100/100"
                  alt="AI Chatbot"
                  data-ai-hint="robot face"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-[calc(100vw-2rem)] sm:w-[400px] h-[60vh] p-0 mr-2 mb-2 z-50 rounded-xl"
        style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
      >
        <div className="h-full flex flex-col">
           <Chatbot />
        </div>
      </PopoverContent>
    </Popover>
  );
}
