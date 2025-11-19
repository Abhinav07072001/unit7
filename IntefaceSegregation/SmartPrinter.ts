import { Printable } from "./src/interfaces/Printable";
import { Faxable  } from "./src/interfaces/Faxable";
import { Scannable } from "./src/interfaces/Scannable";

export class SmartPrinter implements Printable, Scannable, Faxable {
  print(): void {
    console.log("SmartPrinter: Printing...");
  }

  scan(): void {
    console.log("SmartPrinter: Scanning...");
  }

  fax(): void {
    console.log("SmartPrinter: Sending fax...");
  }
}
