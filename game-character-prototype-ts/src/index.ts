// src/index.ts

import { GameCharacter } from "./GameCharacter";

function main() {
  // 1. Create original character
  const warrior = new GameCharacter("Warrior", 10, "Sword");

  // 2. Clone the character
  const warriorClone = warrior.clone();

  // 3. Modify cloned character's name to "Warrior Clone"
  warriorClone.name = "Warrior Clone";

  // Optional: modify level to show they are truly independent
  warriorClone.level = 12;

  // 4. Print both objects
  console.log("Original Character:");
  console.log(warrior.toString());

  console.log("\nCloned Character:");
  console.log(warriorClone.toString());

  // 5. Show they are separate instances
  console.log("\nAre they the same instance?", warrior === warriorClone); // false
  console.log("Both are instances of GameCharacter?",
    warrior instanceof GameCharacter && warriorClone instanceof GameCharacter
  );
}

main();
