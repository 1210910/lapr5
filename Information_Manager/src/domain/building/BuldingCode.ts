import {ValueObject} from "../../core/domain/ValueObject";

export class BuildingCode extends ValueObject<{ code: string }> {
  private constructor(props: { code: string }) {
    super(props);
  }

  get value(): string {
    return this.props.code;
  }

  public static valueOf(value: string): BuildingCode {
    value = value?.trim();
    if (!value) {
      throw new Error("There is no code");
    }
    if (value.length > 10) {
      throw new Error("Building code cannot be longer than 10 characters");
    }
    return (new BuildingCode({ code: value }));
  }
}