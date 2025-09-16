"use client";

import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import RequiredLabel from "./RequiredLabel";
import { cn } from "@/lib/utils";

import type { Control, FieldValues, Path } from "react-hook-form";

interface CountTextareaProps<T extends FieldValues>
  extends React.ComponentProps<"textarea"> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  maxChars?: number;
}

function CountTextarea<T extends FieldValues>({
  name,
  control,
  label = "Alamat",
  required = false,
  maxChars = 200,
  rows = 4,
  className,
  ...props
}: CountTextareaProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const currentLength = field.value?.length || 0;
        const nearLimit = maxChars - currentLength <= 10;

        const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
          const target = e.currentTarget;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
          field.onChange(e);
        };

        return (
          <FormItem className="resize-none">
            {label && (
              <RequiredLabel required={required}>{label}</RequiredLabel>
            )}
            <FormControl className="relative w-full">
              <div className="relative">
                <Textarea
                  {...field}
                  {...props}
                  maxLength={maxChars}
                  onInput={handleInput}
                  rows={rows}
                  cols={1}
                  className={cn(
                    "w-full min-h-[96px] resize-none whitespace-pre-wrap break-words overflow-hidden pr-14 sm:text-sm md:text-base text-wrap",
                    className
                  )}
                  placeholder={props.placeholder ?? `Masukkan ${label}`}
                />
                <span
                  className={cn(
                    "absolute bottom-2 right-3 text-xs",
                    nearLimit
                      ? "text-red-500 font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {currentLength}/{maxChars} Karakter
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default CountTextarea;
