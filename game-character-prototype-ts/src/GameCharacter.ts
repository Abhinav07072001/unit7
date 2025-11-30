// src/GameCharacter.ts

export class GameCharacter {
  public name: string;
  public level: number;
  public weapon: string;

  constructor(name: string, level: number, weapon: string) {
    this.name = name;
    this.level = level;
    this.weapon = weapon;
  }

  /**
   * clone() - Prototype Pattern
   * Returns a new GameCharacter instance
   * with the same properties as the current one.
   */
  public clone(): GameCharacter {
    return new GameCharacter(this.name, this.level, this.weapon);
  }

  public toString(): string {
    return `GameCharacter { name='${this.name}', level=${this.level}, weapon='${this.weapon}' }`;
  }
}
