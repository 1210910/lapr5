import { ValueObject } from "../../core/domain/ValueObject";

export class Model extends ValueObject<{ name: string }>{
  private constructor (props: { name: string }) {
    super(props);
  }

  get value (): string {
    return this.props.name;
  }

  public static valueOf(value: string): Model {
    value = value?.trim();
    if (!value) {
      throw new Error("There is no model");
    }
    if (value.length > 100) {
      throw new Error("Model must be 100 characters or less.");
    }
    return (new Model({ name: value }));
  }
}