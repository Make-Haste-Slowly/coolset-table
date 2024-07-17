export function getUniquePropertyValues(data: any, property: string): string[] {
  const uniqueSections = new Set();

  data.forEach((item: any) => {
    uniqueSections.add(item[property]);
  });

  return Array.from(uniqueSections) as string[];
}
