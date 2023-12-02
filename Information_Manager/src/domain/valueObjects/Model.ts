import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

export class Model extends ValueObject<{ name: string }>{
  private constructor (props: { name: string }) {
    super(props);
  }

  get value (): string {
    return this.props.name;
  }

  public static valueOf(value: string): Result<any> {
    value = value?.trim();
    if (!value) {
      return Result.fail("There is no model");
    }
    if (value.length > 100) {
      return Result.fail("Model must be 100 characters or less.");
    }
    return Result.ok(new Model({ name: value }));
  }
}