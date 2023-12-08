import { ValueObject } from "../../core/domain/ValueObject";

export class PassageCode extends ValueObject<{ code: string }> {
  private constructor(props: { code: string }) {
    super(props);
  }

  get value(): string {
    return this.props.code;
  }

  public static valueOf(floor1: string, floor2: string): PassageCode {
    floor1 = floor1?.trim();
    floor2 = floor2?.trim();
    if (!floor1 || !floor2) {
      throw new Error("Floor codes can't be null or undefined");
    }
    let value: string;
    if (floor1.localeCompare(floor2) < 0) {
      value = floor1 + '-' + floor2;
    } else value = floor2 + '-' + floor1;
    return (new PassageCode({ code: value }));
  }
}