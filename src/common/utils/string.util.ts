export function flattenText(text: string, maxLength?: number): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, maxLength ? maxLength : text.length);
}
