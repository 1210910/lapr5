import { ValueObject } from "../../core/domain/ValueObject";

export class Measures extends ValueObject<{ measure: number }> {
  private constructor(props: { measure: number }) {
    super(props);
  }

  get value(): number {
    return this.props.measure;
  }

  public static valueOf(value: number): Measures {
    this.isValidMeasure(value);
    return new Measures({ measure: value });
  }

  private static isValidMeasure(value: number): boolean {
    if (value <= 0) {
      throw new Error("Measures cannot be negative");
    }
    if (value >= Number.MAX_SAFE_INTEGER) {
      throw new Error("Measure out of boundaries");
    }
    return true;
  }
}