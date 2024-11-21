import { ForkKnife, Home, Users } from "lucide-react";

export const NAV_LINKS = [
  { id: 1, href: "/", label: "Home", icon: Home },
  { id: 2, href: "/recipes", label: "Recipes", icon: ForkKnife },
  { id: 3, href: "/users", label: "Users", icon: Users },
];

export const CATEGORIES = [
  { id: 1, value: "lunch", label: "Lunch" },
  { id: 2, value: "breakfast", label: "Breakfast" },
  { id: 3, value: "dinner", label: "Dinner" },
  { id: 4, value: "snacks", label: "Snacks" },
  { id: 5, value: "brunch", label: "Brunch" },
  { id: 6, value: "dessert", label: "Dessert" },
  { id: 7, value: "drinks", label: "Drinks" },
];
