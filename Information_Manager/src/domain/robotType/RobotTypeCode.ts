import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

export class RobotTypeCode extends ValueObject<{ code: string }> {
  private constructor(props: { code: string }) {
    super(props);
  }

  get value(): string {
    return this.props.code;
  }

  public static valueOf(value: string): Result<any> {
    value = value?.trim();
    if (!value) {
      return Result.fail("There is no code");
    }
    if (value.length > 25) {
      return Result.fail("Code must be 25 characters or less.");
    }
    return Result.ok(new RobotTypeCode({ code: value }));
  }
}