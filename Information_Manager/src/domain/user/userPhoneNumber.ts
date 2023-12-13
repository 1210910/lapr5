import { ValueObject } from "../../core/domain/ValueObject";

export class UserPhoneNumber extends ValueObject<any> {
  get value (): string {
    return this.props.value;
  }

  private constructor (props: any) {
    super(props);
  }

  public static create (phoneNumber: string): UserPhoneNumber {
    phoneNumber = phoneNumber?.trim();
    if (!phoneNumber) {
      return null;
    }
    if (!this.isValid(phoneNumber)) {
      throw new Error("Phone number property has to be in the portuguese format (9 digits)");
    }
    return new UserPhoneNumber({ value: phoneNumber });
  }

  public static isValid (phoneNumber: string): boolean {
    const regex = /^(91|92|93|96)\d{7}$/;
    return regex.test(phoneNumber);
  }
}