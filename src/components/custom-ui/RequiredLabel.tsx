import { FormLabel } from "../ui/form";

interface RequiredLabelProps {
  children: React.ReactNode;
  required?: boolean;
}

function RequiredLabel({ children, required }: RequiredLabelProps) {
  return (
    <FormLabel className="block text-sm font-medium text-gray-700">
      {children} {required && <span className="text-red-500">*</span>}
    </FormLabel>
  );
}

export default RequiredLabel;
