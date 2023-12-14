import { ValueObject } from "../../core/domain/ValueObject";

export class UserPhoneNumber extends ValueObject<any> {
  get value (): number {
    return this.props.value;
  }

  private constructor (props: any) {
    super(props);
  }

  public static create (phoneNumber: number): UserPhoneNumber {
    const phoneNumber1 = phoneNumber?.toString().trim();
    if (!phoneNumber1) {
      return null;
    }
    if (!this.isValid(phoneNumber1)) {
      throw new Error("Phone number property has to be in the portuguese format (9 digits)");
    }
    return new UserPhoneNumber({ value: phoneNumber });
  }

  public static isValid (phoneNumber: string): boolean {
    const regex = /^(91|92|93|96)\d{7}$/;
    return regex.test(phoneNumber);
  }
}