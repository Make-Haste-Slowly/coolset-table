interface Item {
  price: number;
  weight: number;
}

export function calculatePricePerWeight(
  item: Item,
  weight: number = 0.1
): string {
  const pricePerWeight = (item.price / item.weight) * weight;
  return pricePerWeight.toFixed(2);
}
