import { ValueObject } from "../../core/domain/ValueObject";

export class RobotTypeCode extends ValueObject<{ code: string }> {
  private constructor(props: { code: string }) {
    super(props);
  }

  get value(): string {
    return this.props.code;
  }

  public static valueOf(value: string): RobotTypeCode {
    value = value?.trim();
    if (!value) {
      throw new Error("There is no code");
    }
    if (value.length > 25) {
      throw new Error("Code must be 25 characters or less.");
    }
    return (new RobotTypeCode({ code: value }));
  }
}