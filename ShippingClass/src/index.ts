import { ShippingCalculator } from "./ShippingCalculator";
import { StandardShipping } from "./strategies/StandardShipping";
import { ExpressShipping } from "./strategies/ExpressShipping";

const standardCost = new ShippingCalculator(new StandardShipping()).getCost();
console.log("Standard Shipping:", standardCost);

const expressCost = new ShippingCalculator(new ExpressShipping()).getCost();
console.log("Express Shipping:", expressCost);
