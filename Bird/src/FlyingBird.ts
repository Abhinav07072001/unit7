import { Bird } from './Bird';
import { Flyable } from './Flyable';

export abstract class FlyingBird extends Bird implements Flyable {
  abstract fly(): void;
}
