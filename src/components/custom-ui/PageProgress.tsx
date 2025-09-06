"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { NumberTicker } from "@/components/magicui/number-ticker";

export function PageProgress() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading) {
      timer = setInterval(() => {
        setProgress((old) => {
          if (old >= 90) return 90;
          return old + 10;
        });
      }, 200);
    }

    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    const finish = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 300);
    }, 2000);

    return () => clearTimeout(finish);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50 text-center">
      <div className="w-[300px] space-y-2">
        <p className="text-center text-sm font-medium">Loading...</p>
        <NumberTicker
          value={progress}
          decimalPlaces={0}
          className="text-center text-3xl font-bold"
        />
        %
        <Progress value={progress} className="w-full" />
      </div>
    </div>
  );
}
