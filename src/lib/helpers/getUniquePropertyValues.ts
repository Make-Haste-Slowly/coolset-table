export function getUniquePropertyValues<T>(
  data: T[],
  property: keyof T
): string[] {
  const uniqueSections = new Set();

  data.forEach((item) => {
    uniqueSections.add(item[property]);
  });

  return Array.from(uniqueSections) as string[];
}
