import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { IBuildingDTO } from "../../dto/IBuildingDTO";

export class Name extends ValueObject<{ name: string }> {
  private constructor(props: { name: string }) {
    super(props);
  }

  get value(): string {
    return this.props.name;
  }

  public static valueOf(value: string): Result<any> {
    const valid = this.isValidName(value);
    if (valid.isFailure) {
      return Result.fail<IBuildingDTO>(valid.errorValue());
    }
    return Result.ok(new Name({ name: value }));
  }

  private static isValidName(value: string): Result<any> {
    value = value?.trim();
    if (!value) {
      return Result.fail("There is no name");
    }
    if ( value.length >= 50 || value.length < 0) {
      return Result.fail("Name property cannot have more than 50 letters");
    }
    return Result.ok();
  }
}