export async function fetchFileFromUrl(
  url: string,
  fileName: string
): Promise<File> {
  const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL.replace(/\/api$/, "");
  const response = await fetch(`${baseUrl}/storage/${url}`);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}
