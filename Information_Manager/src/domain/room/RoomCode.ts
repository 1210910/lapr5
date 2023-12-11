import { ValueObject } from "../../core/domain/ValueObject";

export class RoomCode extends ValueObject<{ code: string }> {
  private constructor(props: { code: string }) {
    super(props);
  }

  get value(): string {
    return this.props.code;
  }

  public static toDomain(value: string): RoomCode {
    return (new RoomCode({ code: value }));
  }

  public static valueOf(value: string): RoomCode {
    value = value?.trim();
    if (value.length > 10) {
      throw new Error("Room code must have maximum 10 characters.");
    }
    if (!(/^[\w\s]+$/.test(value))) {
      throw new Error("Room code with the wrong format");
    }
    return (new RoomCode({ code: value }));
  }
}