// src/Pizza.ts

// Only allow specific sizes
export type PizzaSize = "small" | "medium" | "large";

/**
 * Pizza class - immutable object constructed via PizzaBuilder
 */
export class Pizza {
  private size: PizzaSize;
  private cheese: boolean;
  private pepperoni: boolean;
  private mushrooms: boolean;

  // Private constructor – cannot create Pizza directly from outside
  private constructor(
    size: PizzaSize,
    cheese: boolean,
    pepperoni: boolean,
    mushrooms: boolean
  ) {
    this.size = size;
    this.cheese = cheese;
    this.pepperoni = pepperoni;
    this.mushrooms = mushrooms;
  }

  /**
   * Static factory that builds a Pizza from a PizzaBuilder.
   * This lets us keep the constructor private and still
   * use a separate PizzaBuilder class.
   */
  public static fromBuilder(builder: PizzaBuilder): Pizza {
    const size = builder.getSize();
    if (!size) {
      throw new Error("Size must be set before building a Pizza");
    }

    return new Pizza(
      size,
      builder.hasCheese(),
      builder.hasPepperoni(),
      builder.hasMushrooms()
    );
  }

  // Getters
  public getSize(): PizzaSize {
    return this.size;
  }

  public hasCheese(): boolean {
    return this.cheese;
  }

  public hasPepperoni(): boolean {
    return this.pepperoni;
  }

  public hasMushrooms(): boolean {
    return this.mushrooms;
  }

  public toString(): string {
    return `Pizza { size='${this.size}', cheese=${this.cheese}, pepperoni=${this.pepperoni}, mushrooms=${this.mushrooms} }`;
  }
}

/**
 * PizzaBuilder - step-by-step builder for Pizza
 */
export class PizzaBuilder {
  private size: PizzaSize | null = null;
  private cheese: boolean = false;
  private pepperoni: boolean = false;
  private mushrooms: boolean = false;

  public setSize(size: PizzaSize): this {
    this.size = size;
    return this;
  }

  public setCheese(cheese: boolean): this {
    this.cheese = cheese;
    return this;
  }

  public setPepperoni(pepperoni: boolean): this {
    this.pepperoni = pepperoni;
    return this;
  }

  public setMushrooms(mushrooms: boolean): this {
    this.mushrooms = mushrooms;
    return this;
  }

  // Getters used by Pizza.fromBuilder
  public getSize(): PizzaSize | null {
    return this.size;
  }

  public hasCheese(): boolean {
    return this.cheese;
  }

  public hasPepperoni(): boolean {
    return this.pepperoni;
  }

  public hasMushrooms(): boolean {
    return this.mushrooms;
  }

  // Final build() method that returns a Pizza
  public build(): Pizza {
    return Pizza.fromBuilder(this);
  }
}
