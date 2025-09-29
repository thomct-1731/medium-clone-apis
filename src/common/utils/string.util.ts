export function flattenText(text: string, maxLength?: number): string {
  return text
    .normalize('NFD') // Unicode Standardization
    .replace(/[\u0300-\u036f]/g, '') // remove the mark
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') // remove leading and trailing hyphens
    .substring(0, maxLength ?? text.length);
}
