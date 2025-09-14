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

        return (
          <FormItem>
            {label && (
              <RequiredLabel required={required}>{label}</RequiredLabel>
            )}
            <FormControl className="relative">
              <div>
                <Textarea
                  {...field}
                  {...props}
                  maxLength={maxChars}
                  className={cn("h-24 pr-14", className)}
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
