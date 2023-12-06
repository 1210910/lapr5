import { ValueObject } from "../../core/domain/ValueObject";

export class Name extends ValueObject<{ name: string }> {
  private constructor(props: { name: string }) {
    super(props);
  }

  get value(): string {
    return this.props.name;
  }

  public static valueOf(value: string): Name {
    this.isValidName(value);
    return (new Name({ name: value }));
  }

  private static isValidName(value: string): boolean {
    value = value?.trim();
    if (!value) {
      throw new Error("There is no name");
    }
    if ( value.length >= 50 || value.length < 0) {
      throw new Error("Name property cannot have more than 50 letters");
    }
    return true;
  }
}