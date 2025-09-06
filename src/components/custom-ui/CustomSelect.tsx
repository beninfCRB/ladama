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
      <SelectTrigger ref={ref} name={name} onBlur={onBlur} className="w-full">
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
