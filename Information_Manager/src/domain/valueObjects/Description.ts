import { ValueObject } from "../../core/domain/ValueObject";

export class Description extends ValueObject<{ description: string }> {
  private constructor(props: { description: string }) {
    super(props);
  }

  get value(): string {
    return this.props.description;
  }

  public static valueOf(value: string): Description {
    this.isValidDescription(value);
    return new Description({ description: value });
  }

  private static isValidDescription(value: string): boolean {
    if (value.length > 250) {
      throw new Error("Description must be 250 characters or less");
    }
    if (!(/^[\w\s]+$/.test(value))) {
      throw new Error("Description with the wrong format");
    }
    return true;
  }

}