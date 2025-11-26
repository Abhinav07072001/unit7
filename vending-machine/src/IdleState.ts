import { State } from "./State";
import { VendingMachine } from "./VendingMachine";

export class IdleState implements State {
  constructor(private machine: VendingMachine) {}

  insertCoin(): void {
    console.log("Coin inserted → Switching to Processing State");
    this.machine.setState(this.machine.processingState);
  }

  selectProduct(): void {
    console.log("Insert a coin first. Still in Idle.");
  }

  dispense(): void {
    console.log("Nothing to dispense.");
  }
}
