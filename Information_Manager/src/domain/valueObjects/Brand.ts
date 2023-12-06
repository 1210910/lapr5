import { ValueObject } from "../../core/domain/ValueObject";

export class Brand extends ValueObject<{ name: string }> {
  private constructor(props: { name: string }) {
    super(props);
  }

  get value(): string {
    return this.props.name;
  }

  public static valueOf(value: string): Brand {
    value = value?.trim();
    if (!value) {
      throw new Error ("There is no brand");
    }
    if (value.length > 50) {
      throw new Error("Brand must be 50 characters or less.");
    }
    return new Brand({ name: value });
  }
}
