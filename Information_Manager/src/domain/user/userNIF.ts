import { ValueObject } from "../../core/domain/ValueObject";

export class UserNIF extends ValueObject<any> {
  get value (): number {
    return this.props.value;
  }

  private constructor (props: any) {
    super(props);
  }

  public static create (nif: number): UserNIF {
    const nif1 = nif?.toString().trim();
    if (!nif1) {
      return null;
    }
    if (nif1.length > 9 && this.isValid(nif1)) {
      throw new Error("NIF property has to be in the portuguese format (9 digits)");
    }
    return new UserNIF({ value: nif });
  }

  public static isValid (nif: string): boolean {
    if (!/^\d{9}$/.test(nif)) {
      return false;
    }

    const digits: number[] = nif.split('').map(Number);
    const lastDigit: number = digits.pop() as number;

    const sum: number = digits.reduceRight((acc: number, digit: number, index: number) => {
      const double: number = index % 2 === 0 ? digit * 2 : digit;
      return acc + (double > 9 ? double - 9 : double);
    }, 0);

    const calculatedLastDigit: number = (sum * 9) % 11;

    return calculatedLastDigit === (lastDigit === 0 ? 0 : 11 - lastDigit);
  }
}