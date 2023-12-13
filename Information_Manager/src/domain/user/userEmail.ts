import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  public static create(email: string): UserEmail {
    email = email.trim();
    if (!email){
      throw new Error("Email is required");
    }
    if (!(/^[a-zA-Z0-9]+@isep.ipp.pt$/.test(email))) {
      throw new Error("Email with the wrong format (must be '@isep.ipp.pt')");
    }
    return (new UserEmail({ value: email }));
  }
}