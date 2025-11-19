import { ShippingStrategy } from "./strategies/ShippingStrategy";

export class ShippingCalculator {
  constructor(private strategy: ShippingStrategy) {}

  getCost(): number {
    return this.strategy.calculate();
  }
}
