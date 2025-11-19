import { Printable } from "./src/interfaces/Printable";

export class OldPrinter implements Printable {
  print(): void {
    console.log("OldPrinter: Printing document...");
  }
}
