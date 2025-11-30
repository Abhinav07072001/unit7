// src/index.ts

import { CarBuilder } from "./Car";

function main() {
  // Create Tesla Model S using builder
  const tesla = new CarBuilder()
    .setBrand("Tesla Model S")
    .setEngine("Electric")
    .setColor("Black")
    .setSunroof(true)
    .setAutomaticTransmission(true)
    .build();

  console.log("Car customization details:");
  console.log(tesla.toString());
}

main();
