import { VendingMachine } from "./VendingMachine";

const machine = new VendingMachine();

console.log("=== Flow ===");
machine.insertCoin();
machine.selectProduct();
machine.dispense();

console.log("\n=== Invalid Actions ===");
machine.dispense();
machine.selectProduct();
machine.insertCoin();
