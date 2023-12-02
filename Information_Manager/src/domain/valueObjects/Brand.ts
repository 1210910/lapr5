import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

export class Brand extends ValueObject<{ name: string }> {
  private constructor(props: { name: string }) {
    super(props);
  }

  get value(): string {
    return this.props.name;
  }

  public static valueOf(value: string): Result<any> {
    value = value?.trim();
    if (!value) {
      return Result.fail("There is no brand");
    }
    if (value.length > 50) {
      return Result.fail("Brand must be 50 characters or less.");
    }
    return Result.ok(new Brand({ name: value }));
  }
}
