import { State } from "./State";
import { VendingMachine } from "./VendingMachine";

export class DispensingState implements State {
  constructor(private machine: VendingMachine) {}

  insertCoin(): void {
    console.log("Wait... I'm dispensing!");
  }

  selectProduct(): void {
    console.log("Already selected.");
  }

  dispense(): void {
    console.log("Dispensing product... Done!");
    this.machine.setState(this.machine.idleState);
  }
}
