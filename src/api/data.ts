export interface DataType {
  id: number;
}

export interface GroceryItem {
  id: number;
  name: string;
  section: string;
  price: number;
  weight: number;
}

export interface CalculatedGroceryItem extends GroceryItem {
  pricePerWeight: string;
}

export const groceriesData: GroceryItem[] = [
  { id: 1, name: "Bananas", section: "Produce", price: 1.29, weight: 0.5 }, // 500g
  { id: 2, name: "Apples", section: "Produce", price: 2.49, weight: 1 }, // 1kg
  { id: 3, name: "Milk", section: "Dairy", price: 3.99, weight: 1 }, // 1L
  { id: 4, name: "Eggs", section: "Dairy", price: 2.19, weight: 0.5 }, // 12 pack
  { id: 5, name: "Bread", section: "Bakery", price: 2.99, weight: 0.5 }, // 500g
  { id: 6, name: "Chicken Breast", section: "Meat", price: 7.99, weight: 0.5 }, // 500g
  { id: 7, name: "Tomatoes", section: "Produce", price: 1.99, weight: 0.3 }, // 300g
  { id: 8, name: "Cheese", section: "Dairy", price: 4.49, weight: 0.2 }, // 200g
  { id: 9, name: "Yogurt", section: "Dairy", price: 0.99, weight: 0.5 }, // 500g
  { id: 10, name: "Cereal", section: "Breakfast", price: 3.79, weight: 0.4 }, // 400g
  { id: 11, name: "Salmon", section: "Seafood", price: 10.99, weight: 0.3 }, // 300g
  {
    id: 12,
    name: "Orange Juice",
    section: "Beverages",
    price: 2.29,
    weight: 1,
  }, // 1L
  { id: 13, name: "Pasta", section: "Pantry", price: 1.79, weight: 0.5 }, // 500g
  { id: 14, name: "Potatoes", section: "Produce", price: 1.49, weight: 1 }, // 1kg
  { id: 15, name: "Butter", section: "Dairy", price: 2.99, weight: 0.2 }, // 200g
  { id: 16, name: "Ice Cream", section: "Frozen", price: 4.99, weight: 0.5 }, // 500g
  { id: 17, name: "Ground Beef", section: "Meat", price: 5.99, weight: 0.5 }, // 500g
  { id: 18, name: "Lettuce", section: "Produce", price: 1.29, weight: 0.2 }, // 200g
  { id: 19, name: "Cucumber", section: "Produce", price: 0.99, weight: 0.3 }, // 300g
  { id: 20, name: "Chocolate", section: "Snacks", price: 2.79, weight: 0.2 }, // 200g
  { id: 21, name: "Rice", section: "Pantry", price: 2.19, weight: 1 }, // 1kg
  { id: 22, name: "Soda", section: "Beverages", price: 1.49, weight: 2 }, // 2L
  { id: 23, name: "Shrimp", section: "Seafood", price: 12.99, weight: 0.5 }, // 500g
  { id: 24, name: "Avocado", section: "Produce", price: 1.99, weight: 0.2 }, // 200g
  {
    id: 25,
    name: "Peanut Butter",
    section: "Pantry",
    price: 3.49,
    weight: 0.5,
  }, // 500g
  { id: 26, name: "Ground Turkey", section: "Meat", price: 6.49, weight: 0.5 }, // 500g
  { id: 27, name: "Onions", section: "Produce", price: 0.79, weight: 0.5 }, // 500g
  {
    id: 28,
    name: "Mayonnaise",
    section: "Condiments",
    price: 2.99,
    weight: 0.5,
  }, // 500g
  { id: 29, name: "Bacon", section: "Meat", price: 8.99, weight: 0.5 }, // 500g
  { id: 30, name: "Sausages", section: "Meat", price: 4.99, weight: 0.5 }, // 500g
  { id: 31, name: "Spinach", section: "Produce", price: 1.49, weight: 0.3 }, // 300g
  { id: 32, name: "Tuna", section: "Canned Goods", price: 1.99, weight: 0.2 }, // 200g
  { id: 33, name: "Bagels", section: "Bakery", price: 2.99, weight: 0.5 }, // 500g
  { id: 34, name: "Orange", section: "Produce", price: 0.79, weight: 0.2 }, // 200g
  { id: 35, name: "Lemons", section: "Produce", price: 1.29, weight: 0.3 }, // 300g
  { id: 36, name: "Honey", section: "Condiments", price: 4.99, weight: 0.3 }, // 300g
  {
    id: 37,
    name: "Salad Dressing",
    section: "Condiments",
    price: 2.49,
    weight: 0.3,
  }, // 300g
  { id: 38, name: "Crackers", section: "Snacks", price: 1.99, weight: 0.5 }, // 500g
  { id: 39, name: "Tofu", section: "Produce", price: 2.49, weight: 0.5 }, // 500g
  { id: 40, name: "Soy Milk", section: "Dairy", price: 3.49, weight: 1 }, // 1L
  { id: 41, name: "Soup", section: "Canned Goods", price: 2.99, weight: 0.5 }, // 500g
  { id: 42, name: "Chips", section: "Snacks", price: 1.99, weight: 0.2 }, // 200g
  { id: 43, name: "Frozen Pizza", section: "Frozen", price: 5.99, weight: 1 }, // 1kg
  {
    id: 44,
    name: "Frozen Vegetables",
    section: "Frozen",
    price: 2.99,
    weight: 1,
  }, // 1kg
  { id: 45, name: "Coffee", section: "Beverages", price: 5.99, weight: 0.5 }, // 500g
  { id: 46, name: "Tea", section: "Beverages", price: 3.49, weight: 0.1 }, // 100g
  { id: 47, name: "Granola Bars", section: "Snacks", price: 3.99, weight: 0.3 }, // 300g
  { id: 48, name: "Olives", section: "Canned Goods", price: 2.29, weight: 0.2 }, // 200g
  { id: 49, name: "Cherries", section: "Produce", price: 3.99, weight: 0.5 }, // 500g
  { id: 50, name: "Grapes", section: "Produce", price: 4.99, weight: 0.5 }, // 500g
  {
    id: 51,
    name: "Cottage Cheese",
    section: "Dairy",
    price: 2.79,
    weight: 0.5,
  }, // 500g
  { id: 52, name: "Salad Mix", section: "Produce", price: 2.99, weight: 0.5 }, // 500g
  {
    id: 53,
    name: "Frozen Berries",
    section: "Frozen",
    price: 6.99,
    weight: 0.5,
  }, // 500g
  {
    id: 54,
    name: "Canned Beans",
    section: "Canned Goods",
    price: 1.29,
    weight: 0.5,
  }, // 500g
  {
    id: 55,
    name: "Coconut Water",
    section: "Beverages",
    price: 2.99,
    weight: 1,
  }, // 1L
  { id: 56, name: "Trail Mix", section: "Snacks", price: 4.49, weight: 0.3 }, // 300g
];

// Computation would be done server side
export const mappedGroceriesData = (): CalculatedGroceryItem[] => {
  function calculatePricePer100g(item: GroceryItem) {
    const pricePer100g = (item.price / item.weight) * 0.1;
    return pricePer100g.toFixed(2);
  }
  return groceriesData.map((item) => ({
    ...item,
    pricePerWeight: calculatePricePer100g(item),
  }));
};
