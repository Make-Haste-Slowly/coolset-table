interface Item {
  price: number;
  weight: number;
}

export function calculatePricePerWeight(
  item: Item,
  weight: number = 0.1
): string {
  if (!item.price || !item.weight) {
    return "N/A";
  }
  const pricePerWeight = (item.price / item.weight) * weight;
  return pricePerWeight.toFixed(2);
}
