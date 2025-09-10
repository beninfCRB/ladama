import type { ControllerRenderProps } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CustomSelectProps<T extends object> extends ControllerRenderProps {
  placeholder: string;
  fieldSetValue: keyof T;
  fieldName: keyof T;
  data?: T[];
}

const CustomSelect = <T extends object>({
  placeholder,
  fieldSetValue,
  fieldName,
  data,
  value,
  disabled,
  onChange,
  onBlur,
  name,
  ref,
}: CustomSelectProps<T>) => {
  const options = data?.map((item) => ({
    value: String(item[fieldSetValue]),
    label: String(item[fieldName]),
  }));

  return (
    <Select
      onValueChange={onChange}
      value={value ? String(value) : ""}
      disabled={disabled}
    >
      <SelectTrigger
        ref={ref}
        name={name}
        onBlur={onBlur}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
      placeholder:text-muted-foreground 
      focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
