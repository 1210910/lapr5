import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";

export class BuildingCode extends ValueObject<{ code: string }> {
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
    if (value.length > 10) {
      return Result.fail("Building code cannot be longer than 10 characters");
    }
    return Result.ok(new BuildingCode({ code: value }));
  }
}