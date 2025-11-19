import { Sparrow } from './Sparrow';
import { Ostrich } from './Ostrich';
import { Flyable } from './Flyable';

function letBirdFly(bird: Flyable) {
  bird.fly();
}

const sparrow = new Sparrow();
letBirdFly(sparrow); // OK

const ostrich = new Ostrich();
// letBirdFly(ostrich); // ❌ compile-time error — ostrich is not Flyable
ostrich.run();
