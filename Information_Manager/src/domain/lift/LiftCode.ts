import { ValueObject } from "../../core/domain/ValueObject";

export class LiftCode extends ValueObject<{ code: string }> {
  private constructor(props: { code: string }) {
    super(props);
  }

  get value(): string {
    return this.props.code;
  }

  public static valueOf(value: string): LiftCode {
    value = value?.trim();
    if (!(/^[\w\s]+$/.test(value))) {
      throw new Error("Lift code with the wrong format");
    }
    return (new LiftCode({ code: value }));
  }
}