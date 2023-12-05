import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

export class Measures extends ValueObject<{ measure: number }> {
  private constructor(props: { measure: number }) {
    super(props);
  }

  get value(): number {
    return this.props.measure;
  }

  public static valueOf(value: number): Result<any> {
    const valid = this.isValidMeasure(value);
    if (valid.isFailure) {
      return Result.fail(valid.errorValue());
    }
    return Result.ok(new Measures({ measure: value }));
  }

  private static isValidMeasure(value: number): Result<any> {
    if (value <= 0) {
      return Result.fail("Measures cannot be negative");
    }
    if (value >= Number.MAX_SAFE_INTEGER) {
      return Result.fail("Measure out of boundaries");
    }
    return Result.ok();
  }
}