import { Bird } from './Bird';

export class Ostrich extends Bird {
  // no fly() method here — ostrich is just a Bird
  run(): void {
    console.log("Ostrich: running fast!");
  }
}
