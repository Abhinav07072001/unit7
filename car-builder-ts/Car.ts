// src/Car.ts

export class Car {
  private brand: string;
  private engine: string;
  private color: string;
  private sunroof: boolean;
  private automaticTransmission: boolean;

  // Private constructor — can only be created using the builder
  private constructor(builder: CarBuilder) {
    this.brand = builder.getBrand();
    this.engine = builder.getEngine();
    this.color = builder.getColor();
    this.sunroof = builder.hasSunroof();
    this.automaticTransmission = builder.hasAutomaticTransmission();
  }

  // Static factory method returning Car from CarBuilder
  public static fromBuilder(builder: CarBuilder): Car {
    if (!builder.getBrand() || !builder.getEngine()) {
      throw new Error("Brand and Engine are required!");
    }
    return new Car(builder);
  }

  public toString(): string {
    return `Car {
  brand: '${this.brand}',
  engine: '${this.engine}',
  color: '${this.color}',
  sunroof: ${this.sunroof},
  automaticTransmission: ${this.automaticTransmission}
}`;
  }
}

// ---------------- CarBuilder Class ----------------

export class CarBuilder {
  private brand: string = "";
  private engine: string = "";
  private color: string = "white"; // default
  private sunroof: boolean = false;
  private automaticTransmission: boolean = false;

  public setBrand(brand: string): this {
    this.brand = brand;
    return this;
  }

  public setEngine(engine: string): this {
    this.engine = engine;
    return this;
  }

  public setColor(color: string): this {
    this.color = color;
    return this;
  }

  public setSunroof(sunroof: boolean): this {
    this.sunroof = sunroof;
    return this;
  }

  public setAutomaticTransmission(auto: boolean): this {
    this.automaticTransmission = auto;
    return this;
  }

  // Getters used by Car's private constructor
  public getBrand(): string {
    return this.brand;
  }

  public getEngine(): string {
    return this.engine;
  }

  public getColor(): string {
    return this.color;
  }

  public hasSunroof(): boolean {
    return this.sunroof;
  }

  public hasAutomaticTransmission(): boolean {
    return this.automaticTransmission;
  }

  // Final build method
  public build(): Car {
    return Car.fromBuilder(this);
  }
}
