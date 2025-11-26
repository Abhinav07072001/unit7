import { State } from "./State";
import { VendingMachine } from "./VendingMachine";

export class ProcessingState implements State {
  constructor(private machine: VendingMachine) {}

  insertCoin(): void {
    console.log("Already have a coin. Select a product.");
  }

  selectProduct(): void {
    console.log("Product selected → Switching to Dispensing State");
    this.machine.setState(this.machine.dispensingState);
  }

  dispense(): void {
    console.log("Select a product first.");
  }
}
