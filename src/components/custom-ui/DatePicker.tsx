"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: string;
  onChange?: (dateString: string | undefined) => void;
  placeholder?: string;
  type?: "date" | "datetime";
}

function DatePicker({
  value,
  onChange,
  placeholder = "Pilih tanggal",
  type = "date",
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? parseISO(value) : undefined
  );

  React.useEffect(() => {
    if (value) {
      const parsedDate = parseISO(value);
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate);
      } else {
        setDate(undefined);
      }
    } else {
      setDate(undefined);
    }
  }, [value]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);

    if (!selectedDate) {
      onChange?.(undefined);
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");

    if (type === "date") {
      const mysqlDate = `${year}-${month}-${day}`;
      onChange?.(mysqlDate);
    } else {
      const hours = String(selectedDate.getHours()).padStart(2, "0");
      const minutes = String(selectedDate.getMinutes()).padStart(2, "0");
      const seconds = String(selectedDate.getSeconds()).padStart(2, "0");
      const mysqlDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      onChange?.(mysqlDateTime);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
