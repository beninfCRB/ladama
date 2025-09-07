export const convertToFormData = <T extends Record<string, unknown>>(
  values: T
): FormData => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value as string | Blob | ArrayBuffer);
    }
  });
  return formData;
};
