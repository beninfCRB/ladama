export const convertToFormData = <T extends Record<string, unknown>>(
  values: T
): FormData => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof ArrayBuffer) {
        formData.append(key, new Blob([value]));
      } else if (value instanceof FileList) {
        Array.from(value).forEach((file) => {
          formData.append(key, file);
        });
      } else if (typeof value === "string" || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string | Blob);
      }
    }
  });
  return formData;
};
