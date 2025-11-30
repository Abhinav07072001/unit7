// src/index.ts

import { PizzaBuilder } from "./Pizza";

function main() {
  // Create a large pizza with cheese and mushrooms
  const pizza = new PizzaBuilder()
    .setSize("large")
    .setCheese(true)
    .setMushrooms(true)
    .build();

  console.log("Pizza order details:");
  console.log(pizza.toString());

  // Also show individual fields
  console.log("Size:", pizza.getSize());
  console.log("Has cheese?", pizza.hasCheese());
  console.log("Has pepperoni?", pizza.hasPepperoni());
  console.log("Has mushrooms?", pizza.hasMushrooms());
}

main();
