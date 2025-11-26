import { State } from "./State";
import { IdleState } from "./IdleState";
import { ProcessingState } from "./ProcessingState";
import { DispensingState } from "./DispensingState";

export class VendingMachine {
  public idleState: State;
  public processingState: State;
  public dispensingState: State;

  private currentState: State;

  constructor() {
    this.idleState = new IdleState(this);
    this.processingState = new ProcessingState(this);
    this.dispensingState = new DispensingState(this);

    this.currentState = this.idleState;
  }

  setState(state: State) {
    this.currentState = state;
  }

  insertCoin() {
    this.currentState.insertCoin();
  }

  selectProduct() {
    this.currentState.selectProduct();
  }

  dispense() {
    this.currentState.dispense();
  }
}
