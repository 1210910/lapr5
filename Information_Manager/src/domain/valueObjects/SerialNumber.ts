import { ValueObject } from "../../core/domain/ValueObject";

export class SerialNumber extends ValueObject<{ code: string }> {
  private constructor(props: { code: string }) {
    super(props);
  }

  get value(): string {
    return this.props.code;
  }

  public static toDomain(value: string): SerialNumber {
    return (new SerialNumber({ code: value }));
  }

  public static valueOf(value: string): SerialNumber {
    value = value?.trim();
    if (!value) {
      throw new Error("Serial Number is required");
    }
    if (value.length > 50) {
      throw new Error("Serial Number property cannot have more than 50 letters");
    }
    return (new SerialNumber({ code: value }));
  }
}