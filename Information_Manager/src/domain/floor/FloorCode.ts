import { ValueObject } from "../../core/domain/ValueObject";

export class FloorCode extends ValueObject<{ code: string }> {
  private constructor(props: { code: string }) {
    super(props);
  }

  get value(): string {
    return this.props.code;
  }

  public static toDomain(value: string): FloorCode {
    return (new FloorCode({ code: value }));
  }

  public static valueOf(value: string): FloorCode {
    value = value?.trim();
    if (value.length > 10) {
      throw new Error("Floor code cannot be longer than 10 characters");
    }
    if (!(/^[\w\s]+$/.test(value))) {
      throw new Error("Floor code with the wrong format");
    }
    return (new FloorCode({ code: value }));
  }
}