import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

export class Description extends ValueObject<{ description: string }> {
  private constructor(props: { description: string }) {
    super(props);
  }

  get value(): string {
    return this.props.description;
  }

  public static valueOf(value: string): Result<any> {
    value = value?.trim();
    if (!value) {
      value = "";
    }
    if (value.length > 250) {
      return Result.fail("Description must be 250 characters or less");
    }
    return Result.ok(new Description({ description: value }));
  }

}