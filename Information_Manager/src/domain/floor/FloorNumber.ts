import { ValueObject } from "../../core/domain/ValueObject";

export class FloorNumber extends ValueObject<{ number: number }> {
  private constructor(props: { number: number }) {
    super(props);
  }

  get value(): number {
    return this.props.number;
  }

  public static valueOf(value: number): FloorNumber {
    if (!value) {
      throw new Error("There is no floor number");
    }
    return (new FloorNumber({ number: value }));
  }
}